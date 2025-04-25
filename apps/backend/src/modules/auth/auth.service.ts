import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Redis } from "ioredis";
import dateFns from "date-fns";
import { IGenerateTokens } from "./auth.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly jwtService: JwtService,
  ) {}

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
