import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaModule } from "../prisma/prisma.module";
import { UserRepository } from "./user.repository";
import { AuthService } from "../auth/auth.service";
import { CacheModule } from "../cache/cache.module";

@Module({
  imports: [PrismaModule , CacheModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthService],
})
export class UserModule { }
