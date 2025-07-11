import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { ShippingInfoRepository } from '../repositories/shipping-info.repository';
import { CreateShippingInfoDto } from '../dto/create-shipping-info.dto';
import { OrderStatus, ShippingInfo } from '@prisma/client';
import { ProductRepository } from '../../product/repositories/product.repository';
import { ProductVariantRepository } from '../../product/repositories/product-variant.repository';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { pagination } from '../../../common/utils/pagination.utils';
import { UpdateShippingInfoDto } from '../dto/update-shipping-info.dto';
import { ShippingInfoMessages } from '../enums/shipping-info-messages.enum';
import { OrderRepository } from '../../order/repositories/order.repository';

@Injectable()
export class ShippingInfoService {
  constructor(
    private readonly shippingInfoRepository: ShippingInfoRepository,
    private readonly orderRepository: OrderRepository,
    private readonly productVariantRepository: ProductVariantRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(userId: number, createShippingInfoDto: CreateShippingInfoDto): Promise<{ message: string; shippingInfo: ShippingInfo }> {
    const { orderId, trackingCode } = createShippingInfoDto;

    const existingShippingInfo = await this.shippingInfoRepository.findOne({ where: { trackingCode } });

    if (existingShippingInfo) throw new ConflictException(ShippingInfoMessages.AlreadyExistsShippingInfo);

    const order = await this.orderRepository.findOneOrThrow({ where: { id: orderId } });

    const product = await this.productRepository.findOne({ where: { userId, orderItems: { some: { orderId } } } });
    const productVariant = await this.productVariantRepository.findOne({ where: { userId, orderItems: { some: { orderId } } } });

    if (!product && !productVariant) throw new BadRequestException(ShippingInfoMessages.NoAccessToCreateShippingInfo);

    await this.orderRepository.update({ where: { id: orderId }, data: { status: OrderStatus.SHIPPED } });

    const newShippingInfo = await this.shippingInfoRepository.create({
      data: { ...createShippingInfoDto, shippingId: order.shippingId },
    });

    return { message: ShippingInfoMessages.CreatedShippingInfoSuccess, shippingInfo: newShippingInfo };
  }

  async findAll(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const shippingInfos = await this.shippingInfoRepository.findAll({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { order: true, shipping: true },
    });

    return pagination(paginationDto, shippingInfos);
  }

  async update(userId: number, shippingInfoId: number, updateShippingInfoDto: UpdateShippingInfoDto) {
    const { trackingCode } = updateShippingInfoDto;

    const shippingInfo = await this.shippingInfoRepository.findOneOrThrow({ where: { id: shippingInfoId } });

    if (trackingCode) {
      const existingShippingInfo = await this.shippingInfoRepository.findOne({ where: { trackingCode, id: { not: shippingInfoId } } });

      if (existingShippingInfo) throw new ConflictException(ShippingInfoMessages.AlreadyExistsShippingInfo);
    }

    // if (orderId) {
    //   await this.orderRepository.findOneOrThrow({ where: { id: orderId } });

    //   const product = await this.productRepository.findOne({ where: { userId, orderItems: { some: { orderId } } } });
    //   const productVariant = await this.productVariantRepository.findOne({ where: { userId, orderItems: { some: { orderId } } } });

    //   if (!product && !productVariant) throw new BadRequestException(ShippingInfoMessages.NoAccessToCreateShippingInfo);

    //   await this.orderRepository.update({ where: { id: orderId }, data: { status: OrderStatus.SHIPPED } });
    //   await this.orderRepository.update({ where: { id: shippingInfo.orderId }, data: { status: OrderStatus.PROCESSING } });
    // }

    const updatedShippingInfo = this.shippingInfoRepository.update({ where: { id: shippingInfoId }, data: updateShippingInfoDto });

    return { message: ShippingInfoMessages.UpdatedShippingInfoSuccess, shippingInfo: updatedShippingInfo };
  }
}
