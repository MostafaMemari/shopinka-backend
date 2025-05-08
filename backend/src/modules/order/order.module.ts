import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddressRepository } from '../address/address.repository';
import { CacheService } from '../cache/cache.service';
import { OrderRepository } from './order.repository';
import { OrderController } from './order.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    PrismaService,
    AddressRepository,
    CacheService,
    OrderRepository,
    AuthService,
    UserRepository
  ],
})
export class OrderModule { }
