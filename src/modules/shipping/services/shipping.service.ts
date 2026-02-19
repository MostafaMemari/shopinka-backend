import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from '../dto/create-shipping.dto';
import { UpdateShippingDto } from '../dto/update-shipping.dto';
import { ShippingRepository } from '../repositories/shipping.repository';
import { Prisma, Shipping } from '@prisma/client';
import { ShippingMessages } from '../enums/shipping-messages.enum';
import { QueryShippingDto } from '../dto/query-shipping.dto';
import { pagination } from '../../../common/utils/pagination.utils';
import { PrismaService } from '../../../modules/prisma/prisma.service';

@Injectable()
export class ShippingService {
  constructor(
    private readonly shippingRepository: ShippingRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(userId: number, createShippingDto: CreateShippingDto): Promise<{ message: string; shipping: Shipping }> {
    const newShipping = await this.shippingRepository.create({ data: { ...createShippingDto, userId } });

    return { message: ShippingMessages.CreatedShippingSuccess, shipping: newShipping };
  }

  async findAll({ page, take, ...queryShippingDto }: QueryShippingDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      estimatedDays,
      isActive,
      maxPrice,
      minPrice,
      name,
      includeOrders,
      includeShippingInfos,
    } = queryShippingDto;

    const filters: Prisma.ShippingWhereInput = {};

    if (name) filters.name = { contains: name };
    if (estimatedDays) filters.estimatedDays = estimatedDays;
    if (isActive !== undefined) filters.isActive = isActive;
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }
    if (maxPrice || minPrice) {
      filters.price = {};
      if (maxPrice) filters.price.gte = maxPrice;
      if (minPrice) filters.price.lte = minPrice;
    }

    const shippings = await this.shippingRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { orders: includeOrders, shippingInfos: includeShippingInfos, user: { select: { id: true, fullName: true } } },
    });

    return { ...pagination(paginationDto, shippings) };
  }

  async findOne(id: number): Promise<Shipping> {
    return this.shippingRepository.findOneOrThrow({
      where: { id },
      include: { orders: true, shippingInfos: true, user: { select: { id: true, fullName: true } } },
    });
  }

  async update(userId: number, shippingId: number, updateShippingDto: UpdateShippingDto): Promise<{ message: string; shipping: Shipping }> {
    await this.shippingRepository.findOneOrThrow({ where: { id: shippingId, userId } });

    const updatedShipping = await this.shippingRepository.update({ where: { id: shippingId }, data: updateShippingDto });

    return { message: ShippingMessages.UpdatedShippingSuccess, shipping: updatedShipping };
  }

  async setDefault(id: number): Promise<{ message: string }> {
    const shippingToSetDefault = await this.shippingRepository.findOneOrThrow({ where: { id } });
    if (shippingToSetDefault.isDefault) return { message: ShippingMessages.SetDefaultShippingSuccess };

    const currentDefaultShipping = await this.shippingRepository.findOne({ where: { isDefault: true } });

    await this.prismaService.$transaction(async (tx) => {
      if (currentDefaultShipping) {
        await tx.shipping.update({
          where: { id: currentDefaultShipping.id },
          data: { isDefault: false },
        });
      }
      await tx.materialSticker.update({
        where: { id: shippingToSetDefault.id },
        data: { isDefault: true },
      });
    });
    return { message: ShippingMessages.SetDefaultShippingSuccess };
  }

  async remove(userId: number, shippingId: number): Promise<{ message: string; shipping: Shipping }> {
    await this.shippingRepository.findOneOrThrow({ where: { id: shippingId, userId } });

    const removedShipping = await this.shippingRepository.delete({ where: { id: shippingId } });

    return { message: ShippingMessages.RemovedShippingSuccess, shipping: removedShipping };
  }
}
