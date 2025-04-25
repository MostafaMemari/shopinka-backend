import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { redisConfig } from "src/configs/redis.config";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: "./.env" }), RedisModule.forRoot(redisConfig()), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
