import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import * as dateFns from 'date-fns';
import { Smsir } from 'sms-typescript/lib';
import { Role, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';

import { IGenerateTokens, IRefreshToken } from './auth.interface';
import { AuthMessages } from './enums/auth.messages';
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

  async validateRefreshToken(refreshToken: string): Promise<{ userId: number; jti: string }> {
    const payload = this.jwtService.verify<{ id: number; jti: string }>(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET });

    if (!payload?.jti) {
      throw new BadRequestException(AuthMessages.InvalidRefreshToken);
    }

    const storedUserId = await this.redis.get(`refresh:${payload.jti}`);

    if (!storedUserId) {
      throw new UnauthorizedException(AuthMessages.NotFoundRefreshToken);
    }

    if (Number(storedUserId) !== payload.id) {
      throw new UnauthorizedException(AuthMessages.InvalidRefreshToken);
    }

    return { userId: payload.id, jti: payload.jti };
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
    const jti = randomUUID();

    const payload = {
      id: user.id,
      jti,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });

    const parseDays: number = Number.parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME);
    const now = new Date();
    const futureDate = dateFns.addDays(now, parseDays);
    const refreshTokenExpireTime: number = dateFns.differenceInSeconds(futureDate, now);

    await this.redis.set(`refresh:${jti}`, user.id.toString(), 'EX', refreshTokenExpireTime);

    return { accessToken, refreshToken };
  }

  async refreshToken({ refreshToken }: { refreshToken: string }): Promise<IRefreshToken> {
    const { userId, jti } = await this.validateRefreshToken(refreshToken);

    // await this.redis.del(`refresh:${jti}`);

    const payload = { id: userId, jti };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
    });

    return {
      accessToken: accessToken,
      message: AuthMessages.RefreshedTokenSuccess,
    };
  }

  async signout({ refreshToken }: { refreshToken: string }) {
    const { jti } = await this.validateRefreshToken(refreshToken);

    await this.redis.del(`refresh:${jti}`);

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

    await this.validateOtpRedis(mobile, otp);

    let jwtTokens: IGenerateTokens;

    const existingUser = await this.userRepository.findOne({ where: { mobile } });

    if (existingUser) {
      jwtTokens = await this.generateTokens({ id: existingUser.id });
    } else {
      const usersCount = await this.userRepository.count();
      const role = usersCount === 0 ? Role.SUPER_ADMIN : Role.CUSTOMER;

      const user = await this.userRepository.create({
        mobile,
        isVerifiedMobile: true,
        role,
      });

      jwtTokens = await this.generateTokens({ id: user.id });
    }

    await this.clearOtpRedisAll(mobile);

    return {
      message: AuthMessages.VerifiedOtpSuccess,
      ...jwtTokens,
    };
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
      await this.redis.expire(key, this.OTP_REQUEST_TIMEOUT_SEC);
    }

    if (requests > this.OTP_REQUEST_LIMIT) {
      const ttl = await this.redis.ttl(key);

      throw new ForbiddenException(AuthMessages.MaxOtpRequests.replace('{time}', this.formatSecondsToMinutes(ttl)));
    }
  }

  private async clearOtpRedisAll(mobile: string): Promise<void> {
    await this.redis.del(`otp:code:${mobile}`, `otp:requests:${mobile}`);
  }
}
