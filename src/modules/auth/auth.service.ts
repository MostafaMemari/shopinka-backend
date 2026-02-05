import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as dateFns from 'date-fns';
import { Smsir } from 'sms-typescript/lib';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { IGenerateTokens, IRefreshToken } from './auth.interface';
import { AuthMessages } from './enums/auth.messages';
import { OtpKeys } from './enums/otp.keys';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { SendOtpDto } from './dto/authenticate.dto';
import { VerifyMobileDto } from './dto/verify-mobile.dto';

import { UserRepository } from '../user/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  private readonly OTP_EXPIRATION_SEC = 120; //* 2 minutes
  private readonly OTP_REQUEST_LIMIT = 5;
  private readonly OTP_REQUEST_TIMEOUT_SEC = 3600; //* 1 hour

  constructor(
    @InjectRedis() private readonly redis: Redis,

    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  private generateOtp() {
    return Math.floor(100_000 + Math.random() * 900_000).toString();
  }

  async validateRefreshToken(refreshToken: string): Promise<{ refreshTokenId: number }> {
    const jwtResult = this.jwtService.decode<{ id: number } | undefined>(refreshToken);
    if (!jwtResult?.id) throw new BadRequestException(AuthMessages.InvalidRefreshToken);

    const found = await this.prisma.refreshToken.findFirst({
      where: {
        userId: jwtResult.id,
        token: refreshToken,
        expiresAt: { gt: new Date() },
      },
    });

    if (!found) throw new NotFoundException(AuthMessages.NotFoundRefreshToken);

    return { refreshTokenId: found.id };
  }

  async verifyAccessToken(verifyTokenDto: { accessToken: string }): Promise<User> {
    try {
      const { ACCESS_TOKEN_SECRET } = process.env;

      const verifiedToken = this.jwtService.verify<{ id: number }>(verifyTokenDto.accessToken, { secret: ACCESS_TOKEN_SECRET });

      if (!verifiedToken?.id) {
        throw new BadRequestException(AuthMessages.InvalidAccessTokenPayload);
      }

      return await this.userRepository.findOneOrThrow({
        where: { id: verifiedToken.id },
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new UnauthorizedException(AuthMessages.InvalidAccessToken);
    }
  }

  async generateTokens(user: { id: number }): Promise<IGenerateTokens> {
    const payload = { id: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    const parseDays = Number.parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME);
    const now = new Date();
    const expiresAt = dateFns.addDays(now, parseDays);

    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expiresAt,
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshToken({ refreshToken }: { refreshToken: string }): Promise<IRefreshToken> {
    await this.validateRefreshToken(refreshToken);

    const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRE_TIME } = process.env;

    const { id } = this.jwtService.verify<{ id: number }>(refreshToken, { secret: REFRESH_TOKEN_SECRET });

    const newAccessToken = this.jwtService.sign({ id }, { secret: ACCESS_TOKEN_SECRET, expiresIn: ACCESS_TOKEN_EXPIRE_TIME });

    return { accessToken: newAccessToken, message: AuthMessages.RefreshedTokenSuccess };
  }

  async signout({ refreshToken }: { refreshToken: string }) {
    const { refreshTokenId } = await this.validateRefreshToken(refreshToken);
    await this.prisma.refreshToken.delete({ where: { id: refreshTokenId } });

    return { message: AuthMessages.SignoutSuccess };
  }

  async sendOtp({ mobile }: SendOtpDto): Promise<{ message: string }> {
    await this.checkExistingOtpRedis(mobile);

    const otpCode = this.generateOtp();

    await this.sendSms(mobile, otpCode);

    await this.enforceOtpRequestLimitRedis(mobile);
    await this.storeOtpRedis(mobile, otpCode);

    return { message: AuthMessages.OtpSentSuccessfully };
  }

  async verifyOtp({ mobile, otp }: VerifyOtpDto): Promise<{ message: string }> {
    await this.enforceOtpRequestLimitRedis(mobile);

    await this.validateOtpRedis(mobile, otp);

    await this.clearOtpRedis(mobile);

    return { message: AuthMessages.VerifiedOtpSuccess };
  }

  async requestVerificationMobile(user: User): Promise<{ message: string }> {
    if (user.isVerifiedMobile) throw new BadRequestException(AuthMessages.AlreadyVerifiedMobile);

    return await this.sendOtp({ mobile: user.mobile });
  }

  async verifyMobileOtp({ otp }: VerifyMobileDto, user: User): Promise<{ message: string }> {
    if (user.isVerifiedMobile) throw new BadRequestException(AuthMessages.AlreadyVerifiedMobile);

    await this.verifyOtp({ otp, mobile: user.mobile });

    await this.userRepository.update({
      where: { mobile: user.mobile },
      data: {
        isVerifiedMobile: true,
        perviousMobile: null,
        lastMobileChange: new Date(),
        updatedAt: new Date(),
      },
    });

    return { message: AuthMessages.VerifiedMobileSuccess };
  }

  async verifyAuthenticateOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string } & IGenerateTokens> {
    const { mobile, otp } = verifyOtpDto;

    await this.enforceOtpRequestLimit(`${OtpKeys.RequestsOtp}${mobile}`);

    await this.validateOtp(`${OtpKeys.StoreOtp}${mobile}`, otp);

    await this.clearOtpData(mobile);

    const existingUser = await this.userRepository.findOne({ where: { mobile } });

    if (existingUser) {
      const jwtTokens = await this.generateTokens({ id: existingUser.id });

      return { message: AuthMessages.VerifiedOtpSuccess, ...jwtTokens };
    }

    const usersCount = await this.userRepository.count();

    const userRole = usersCount == 0 ? Role.SUPER_ADMIN : Role.CUSTOMER;

    const user = await this.userRepository.create({ mobile, isVerifiedMobile: true, role: userRole });

    const jwtTokens = await this.generateTokens({ id: user.id });

    return { message: AuthMessages.VerifiedOtpSuccess, ...jwtTokens };
  }

  private async sendSms(mobile: string, verifyCode: string): Promise<void | never> {
    const { SMS_API_KEY, SMS_LINE_NUMBER, SMS_TEMPLATE_ID, SMS_NAME } = process.env;
    const sms = new Smsir(SMS_API_KEY, Number(SMS_LINE_NUMBER));

    if (process.env.NODE_ENV === 'production') {
      const result = await sms.SendVerifyCode(mobile, Number(SMS_TEMPLATE_ID), [{ name: SMS_NAME, value: verifyCode }]);
      if (result.data?.status !== 1) throw new InternalServerErrorException(AuthMessages.ProblemSendingSms);
    } else {
      console.log(mobile, verifyCode);
    }
  }

  private async clearOtpData(mobile: string): Promise<void> {
    await this.prisma.otpRequest.deleteMany({
      where: { mobile: `${OtpKeys.StoreOtp}${mobile}`, expiresAt: { gt: new Date() } },
    });
  }

  private async validateOtp(mobile: string, otp: string): Promise<void> {
    const storedOtp = await this.prisma.otpRequest.findFirst({
      where: {
        mobile,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!storedOtp) throw new BadRequestException(AuthMessages.NotFoundOrInvalidOtpCode);

    const isValid = await bcrypt.compare(otp, storedOtp.otp);

    if (!isValid) throw new BadRequestException(AuthMessages.NotFoundOrInvalidOtpCode);
  }

  private async enforceOtpRequestLimit(mobile: string): Promise<void> {
    const oneHourAgo = new Date(Date.now() - this.OTP_REQUEST_TIMEOUT_SEC * 1000);

    const recentRequests = await this.prisma.otpRequest.findMany({
      where: {
        mobile,
        createdAt: { gte: oneHourAgo },
      },
    });

    if (recentRequests.length >= this.OTP_REQUEST_LIMIT) {
      const firstRequest = recentRequests[0];
      const secondsPassed = Math.floor((Date.now() - +firstRequest.createdAt) / 1000);
      const remaining = this.OTP_REQUEST_TIMEOUT_SEC - secondsPassed;

      throw new ForbiddenException(AuthMessages.MaxOtpRequests.replace('{time}', this.formatSecondsToMinutes(remaining)));
    }
  }

  private formatSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  private async storeOtpRedis(mobile: string, otp: string): Promise<void> {
    const hashedOtp = await bcrypt.hash(otp, 10);

    await this.redis.set(`otp:code:${mobile}`, hashedOtp, 'EX', this.OTP_EXPIRATION_SEC);
  }

  private async checkExistingOtpRedis(mobile: string): Promise<void> {
    const ttl = await this.redis.ttl(`otp:code:${mobile}`);

    if (ttl > 0) {
      throw new ConflictException(AuthMessages.OtpAlreadySentWithWaitTime.replace('{time}', this.formatSecondsToMinutes(ttl)));
    }
  }

  private async validateOtpRedis(mobile: string, otp: string): Promise<void> {
    const storedOtp = await this.redis.get(`otp:code:${mobile}`);

    if (!storedOtp) throw new BadRequestException(AuthMessages.NotFoundOrInvalidOtpCode);

    const isValid = await bcrypt.compare(otp, storedOtp);

    if (!isValid) throw new BadRequestException(AuthMessages.NotFoundOrInvalidOtpCode);
  }

  private async clearOtpRedis(mobile: string): Promise<void> {
    await this.redis.del(`otp:code:${mobile}`);
  }

  private async enforceOtpRequestLimitRedis(mobile: string): Promise<void> {
    const key = `otp:requests:${mobile}`;

    const requests = await this.redis.incr(key);

    if (requests === 1) {
      await this.redis.expire(key, this.OTP_REQUEST_TIMEOUT_SEC); // 1 ساعت
    }

    if (requests > this.OTP_REQUEST_LIMIT) {
      const ttl = await this.redis.ttl(key);

      throw new ForbiddenException(AuthMessages.MaxOtpRequests.replace('{time}', this.formatSecondsToMinutes(ttl)));
    }
  }
}
