import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [JwtModule.register({ global: true })],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, PrismaService],
  exports: [AuthService, UserRepository, JwtModule, PrismaService],
})
export class AuthModule {}
