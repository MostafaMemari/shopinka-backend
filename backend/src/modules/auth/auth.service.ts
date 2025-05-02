import { InjectRedis } from "@nestjs-modules/ioredis";
import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Redis } from "ioredis";
import * as dateFns from "date-fns";
import { IGenerateTokens, IRefreshToken } from "./auth.interface";
import { AuthMessages } from "./enums/auth.messages";
import { OtpKeys } from "./enums/otp.keys";
import { VerifyOtpDto } from "./dto/verifyOtp.dto";
import * as bcrypt from "bcryptjs"
import { Smsir } from "sms-typescript/lib"
import { SendOtpDto } from "./dto/authenticate.dto";
import { UserRepository } from "../user/user.repository";
import { Role, User } from "generated/prisma";
import { VerifyMobileDto } from "./dto/verify-mobile.dto";

@Injectable()
export class AuthService {
    private readonly OTP_EXPIRATION_SEC = 300; //* 5 minutes
    private readonly OTP_REQUEST_LIMIT = 5;
    private readonly OTP_REQUEST_TIMEOUT_SEC = 3600; //* 1 hour

    constructor(
        @InjectRedis() private readonly redis: Redis,
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) { }

    private generateOtp() {
        return Math.floor(100_000 + Math.random() * 900_000).toString();
    }

    async validateRefreshToken(refreshToken: string): Promise<never | { refreshTokenKey: string }> {
        const jwtResult = this.jwtService.decode<{ id: number } | undefined>(refreshToken);

        if (!jwtResult?.id)
            throw new BadRequestException(AuthMessages.InvalidRefreshToken);

        const refreshTokenKey = `refreshToken_${jwtResult.id}_${refreshToken}`;

        const storedToken = await this.redis.get(refreshTokenKey);

        if (storedToken !== refreshToken || !storedToken)
            throw new NotFoundException(AuthMessages.NotFoundRefreshToken);

        return { refreshTokenKey };
    }

    async verifyAccessToken(verifyTokenDto: { accessToken: string }): Promise<never | User> {
        try {
            const { ACCESS_TOKEN_SECRET } = process.env;

            const verifiedToken = this.jwtService.verify<{ id: number }>(
                verifyTokenDto.accessToken,
                { secret: ACCESS_TOKEN_SECRET },
            );

            if (!verifiedToken.id) {
                throw new BadRequestException(AuthMessages.InvalidAccessTokenPayload);
            }

            const user = await this.userRepository.findOneOrThrow({ where: { id: verifiedToken.id } })

            return user;
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async generateTokens(user: { id: number }): Promise<IGenerateTokens> {
        const payload = { id: user.id };

        const parseDays: number = Number.parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME);

        const now = new Date();

        const futureDate = dateFns.addDays(now, parseDays);

        const refreshTokenExpireTime: number = dateFns.differenceInSeconds(futureDate, now);

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.ACCESS_TOKEN_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
        });

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
            secret: process.env.REFRESH_TOKEN_SECRET,
        });

        const redisData = {
            value: refreshToken,
            key: `refreshToken_${user.id}_${refreshToken}`,
            expireTime: refreshTokenExpireTime,
        };

        await this.redis.set(
            redisData.key,
            redisData.value,
            "EX",
            redisData.expireTime,
        );

        return { accessToken, refreshToken };
    }

    async refreshToken({ refreshToken }: { refreshToken: string }): Promise<IRefreshToken> {
        await this.validateRefreshToken(refreshToken);

        const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE_TIME } = process.env;

        const { id } = this.jwtService.verify<{ id: number }>(refreshToken, { secret: REFRESH_TOKEN_SECRET });

        const newAccessToken = this.jwtService.sign({ id }, { secret: ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TOKEN_EXPIRE_TIME });

        return { accessToken: newAccessToken, message: AuthMessages.RefreshedTokenSuccess }
    }


    async signout(signoutDto: { refreshToken: string }): Promise<{ message: string }> {
        const { refreshTokenKey } = await this.validateRefreshToken(signoutDto.refreshToken);

        await this.redis.del(refreshTokenKey);

        return { message: AuthMessages.SignoutSuccess }
    }

    async sendOtp({ mobile }: SendOtpDto): Promise<{ message: string }> {
        await this.checkExistingOtp(`${OtpKeys.StoreOtp}${mobile}`);

        const otpCode = this.generateOtp()

        await this.sendSms(mobile, otpCode);

        await this.enforceOtpRequestLimit(`${OtpKeys.RequestsOtp}${mobile}`);
        await this.storeOtp(`${OtpKeys.StoreOtp}${mobile}`, otpCode);

        return { message: AuthMessages.OtpSentSuccessfully }
    }

    async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string }> {
        const { mobile, otp } = verifyOtpDto;

        await this.enforceOtpRequestLimit(`${OtpKeys.RequestsOtp}${mobile}`);

        await this.validateOtp(`${OtpKeys.StoreOtp}${mobile}`, otp);

        await this.clearOtpData(mobile);

        return { message: AuthMessages.VerifiedOtpSuccess }
    }

    async requestVerificationMobile(user: User): Promise<{ message: string }> {
        if (user.isVerifiedMobile) throw new BadRequestException(AuthMessages.AlreadyVerifiedMobile)

        return await this.sendOtp({ mobile: user.mobile })
    }

    async verifyMobileOtp({ otp }: VerifyMobileDto, user: User): Promise<{ message: string }> {
        if (user.isVerifiedMobile) throw new BadRequestException(AuthMessages.AlreadyVerifiedMobile)


        await this.verifyOtp({ otp, mobile: user.mobile })

        await this.userRepository.update({
            where: { mobile: user.mobile },
            data: {
                isVerifiedMobile: true,
                perviousMobile: null,
                lastMobileChange: new Date(),
                updatedAt: new Date(),
            }
        })

        return { message: AuthMessages.VerifiedMobileSuccess }
    }

    async verifyAuthenticateOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string } & IGenerateTokens> {
        const { mobile, otp } = verifyOtpDto;

        await this.enforceOtpRequestLimit(`${OtpKeys.RequestsOtp}${mobile}`);

        await this.validateOtp(`${OtpKeys.StoreOtp}${mobile}`, otp);

        await this.clearOtpData(mobile);

        const existingUser = await this.userRepository.findOne({ where: { mobile } })

        if (existingUser) {
            const jwtTokens = await this.generateTokens({ id: existingUser.id })

            return { message: AuthMessages.VerifiedOtpSuccess, ...jwtTokens }
        }

        const usersCount = await this.userRepository.count()

        const userRole = usersCount == 0 ? Role.SUPER_ADMIN : Role.CUSTOMER

        const user = await this.userRepository.create({ mobile, isVerifiedMobile: true, role: userRole })

        const jwtTokens = await this.generateTokens({ id: user.id })

        return { message: AuthMessages.VerifiedOtpSuccess, ...jwtTokens }
    }

    private async sendSms(mobile: string, verifyCode: string): Promise<void | never> {
        const { SMS_API_KEY, SMS_LINE_NUMBER, SMS_TEMPLATE_ID, SMS_NAME } = process.env;
        const sms = new Smsir(SMS_API_KEY, Number(SMS_LINE_NUMBER));
        console.log(mobile, verifyCode);
        //TODO: Uncomment send otp
        // const result = await sms.SendVerifyCode(mobile, Number(SMS_TEMPLATE_ID), [{ name: SMS_NAME, value: verifyCode }]);

        // if (result.data?.status !== 1) throw new InternalServerErrorException(AuthMessages.ProblemSendingSms);
    }

    private async clearOtpData(mobile: string): Promise<void | never> {
        await Promise.all([
            this.redis.del(`${OtpKeys.StoreOtp}${mobile}`),
            this.redis.del(`${OtpKeys.RequestsOtp}${mobile}`),
        ]);
    }

    private async validateOtp(otpKey: string, otp: string): Promise<void | never> {
        const storedOtp = await this.redis.get(otpKey);
        const isValidOtp = await bcrypt.compare(otp, storedOtp || '');

        if (!isValidOtp) {
            throw new BadRequestException(AuthMessages.NotFoundOrInvalidOtpCode);
        }
    }

    private async checkExistingOtp(otpKey: string): Promise<void | never> {
        const existingOtp = await this.redis.get(otpKey);
        const otpTtl = await this.redis.ttl(otpKey);

        if (existingOtp)
            throw new ConflictException(`${AuthMessages.OtpAlreadySentWithWaitTime}${this.formatSecondsToMinutes(otpTtl)}`);
    }

    private async storeOtp(otpKey: string, otp: string): Promise<void | never> {
        const hashedOtp = await bcrypt.hash(otp, 10);
        await this.redis.setex(otpKey, this.OTP_EXPIRATION_SEC, hashedOtp);
    }

    private async enforceOtpRequestLimit(requestKey: string): Promise<void | never> {
        let requestCount = Number(await this.redis.get(requestKey)) || 0;
        const requestCountTtl = await this.redis.ttl(requestKey);
        if (requestCount >= this.OTP_REQUEST_LIMIT) {
            const formattedTime = this.formatSecondsToMinutes(requestCountTtl);
            throw new ForbiddenException(`${AuthMessages.MaxOtpRequests}${formattedTime}.`);
        }

        await this.redis.setex(requestKey, this.OTP_REQUEST_TIMEOUT_SEC, requestCount + 1);
    }

    private formatSecondsToMinutes(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

}
