import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { redisConfig } from "../../configs/redis.config";
import { ConfigModule } from "@nestjs/config";
import envConfig from "../../configs/env.config";

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    RedisModule.forRoot(redisConfig()),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
