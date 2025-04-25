import { InjectRedis } from "@nestjs-modules/ioredis";
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Redis } from "ioredis";
import dateFns from "date-fns";
import { IGenerateTokens } from "./auth.interface";
import { AuthMessages } from "./messages/auth.messages";

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
  ) {}

  generateOtp() {
    return Math.floor(100_000 + Math.random() * 900_000).toString();
  }

  async validateRefreshToken(
    refreshToken: string,
  ): Promise<never | { refreshTokenKey: string }> {
    const jwtResult = this.jwtService.decode<{ id: number } | undefined>(
      refreshToken,
    );

    if (!jwtResult?.id)
      throw new BadRequestException(AuthMessages.InvalidRefreshToken);

    const refreshTokenKey = `refreshToken_${jwtResult.id}_${refreshToken}`;

    const storedToken = await this.redis.get(refreshTokenKey);

    if (storedToken !== refreshToken || !storedToken)
      throw new NotFoundException(AuthMessages.NotFoundRefreshToken);

    return { refreshTokenKey };
  }

  async verifyAccessToken(verifyTokenDto: {
    accessToken: string;
  }): Promise<{ userId: number }> {
    try {
      const { ACCESS_TOKEN_SECRET } = process.env;

      const verifiedToken = this.jwtService.verify<{ id: number }>(
        verifyTokenDto.accessToken,
        { secret: ACCESS_TOKEN_SECRET },
      );

      if (!verifiedToken.id) {
        throw new BadRequestException(AuthMessages.InvalidAccessTokenPayload);
      }

      return { userId: verifiedToken.id };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generateTokens(user: { id: number }): Promise<IGenerateTokens> {
    const payload = { id: user.id };

    const parseDays: number = Number.parseInt(
      process.env.REFRESH_TOKEN_EXPIRE_TIME,
    );

    const now = new Date();

    const futureDate = dateFns.addDays(now, parseDays);

    const refreshTokenExpireTime: number = dateFns.differenceInSeconds(
      futureDate,
      now,
    );

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
}
