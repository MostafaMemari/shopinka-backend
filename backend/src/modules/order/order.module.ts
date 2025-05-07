import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { AddressRepository } from '../address/address.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  providers: [OrderService, PrismaService, AddressRepository, CacheService],
})
export class OrderModule { }
