import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShippingInfo, Prisma } from 'generated/prisma';
import { ShippingInfoMessages } from '../enums/shipping-info-messages.enum';

@Injectable()
export class ShippingInfoRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.ShippingInfoCreateArgs): Promise<ShippingInfo> {
    return this.prismaService.shippingInfo.create(args);
  }

  findAll(args: Prisma.ShippingInfoFindManyArgs = {}): Promise<ShippingInfo[]> {
    return this.prismaService.shippingInfo.findMany(args);
  }

  findOne(args: Prisma.ShippingInfoFindFirstArgs): Promise<ShippingInfo | null> {
    return this.prismaService.shippingInfo.findFirst(args);
  }

  update(args: Prisma.ShippingInfoUpdateArgs): Promise<ShippingInfo> {
    return this.prismaService.shippingInfo.update(args);
  }

  async findOneOrThrow(args: Prisma.ShippingInfoFindFirstArgs): Promise<ShippingInfo | never> {
    const shipping = await this.findOne(args);

    if (!shipping) throw new NotFoundException(ShippingInfoMessages.NotFoundShippingInfo);

    return shipping;
  }
}
