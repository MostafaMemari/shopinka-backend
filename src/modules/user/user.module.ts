import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { UserRepository } from './user.repository';
import { AuthService } from '../auth/auth.service';
import { FavoriteRepository } from '../product/repositories/favorite.repository';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthService, FavoriteRepository],
})
export class UserModule {}
