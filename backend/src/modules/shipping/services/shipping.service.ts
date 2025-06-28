import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from '../dto/create-shipping.dto';
import { UpdateShippingDto } from '../dto/update-shipping.dto';
import { ShippingRepository } from '../repositories/shipping.repository';
import { Prisma, Shipping } from '@prisma/client';
import { ShippingMessages } from '../enums/shipping-messages.enum';
import { QueryShippingDto } from '../dto/query-shipping.dto';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { CacheService } from '../../cache/cache.service';
import { pagination } from '../../../common/utils/pagination.utils';

@Injectable()
export class ShippingService {
  private readonly CACHE_EXPIRE_TIME: number = 600; //* 5 minutes

  constructor(
    private readonly shippingRepository: ShippingRepository,
    private readonly cacheService: CacheService,
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

    const sortedDto = sortObject(queryShippingDto);

    const cacheKey = `${CacheKeys.Shippings}_${JSON.stringify(sortedDto)}`;

    const cachedShippings = await this.cacheService.get<null | Shipping[]>(cacheKey);

    if (cachedShippings) return { ...pagination(paginationDto, cachedShippings) };

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

    await this.cacheService.set(cacheKey, shippings, this.CACHE_EXPIRE_TIME);

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

  async remove(userId: number, shippingId: number): Promise<{ message: string; shipping: Shipping }> {
    await this.shippingRepository.findOneOrThrow({ where: { id: shippingId, userId } });

    const removedShipping = await this.shippingRepository.delete({ where: { id: shippingId } });

    return { message: ShippingMessages.RemovedShippingSuccess, shipping: removedShipping };
  }
}
