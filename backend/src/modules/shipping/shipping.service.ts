import { Injectable } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ShippingRepository } from './shipping.repository';
import { Shipping } from 'generated/prisma';
import { ShippingMessages } from './enums/shipping-messages.enum';

@Injectable()
export class ShippingService {
  constructor(
    private readonly shippingRepository: ShippingRepository
  ) { }

  async create(userId: number, createShippingDto: CreateShippingDto): Promise<{ message: string, shipping: Shipping }> {
    const newShipping = await this.shippingRepository.create({ data: { ...createShippingDto, userId } })

    return { message: ShippingMessages.CreatedShippingSuccess, shipping: newShipping }
  }

  findAll() {
    return `This action returns all shipping`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shipping`;
  }

  update(id: number, updateShippingDto: UpdateShippingDto) {
    return `This action updates a #${id} shipping`;
  }

  remove(id: number) {
    return `This action removes a #${id} shipping`;
  }
}
