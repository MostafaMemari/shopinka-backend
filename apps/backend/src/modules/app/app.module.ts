import { Module, ValidationPipe } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../user/user.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { redisConfig } from "../../configs/redis.config";
import { ConfigModule } from "@nestjs/config";
import envConfig from "../../configs/env.config";
import { APP_PIPE } from "@nestjs/core";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaModule } from "../prisma/prisma.module";
import { CacheModule } from "../cache/cache.module";
import { HttpApiModule } from "../http/http.module";
import { PaymentModule } from "../payment/payment.module";
import { GalleryModule } from "../gallery/gallery.module";

@Module({
  imports: [
    ConfigModule.forRoot(envConfig()),
    RedisModule.forRoot(redisConfig()),
    AuthModule,
    UserModule,
    PrismaModule,
    CacheModule,
    HttpApiModule,
    PaymentModule,
    GalleryModule
  ],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ],
})
export class AppModule { }
