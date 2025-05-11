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

  async findOne(id: number): Promise<Shipping> {
    return this.shippingRepository.findOneOrThrow({ where: { id }, include: { user: { select: { id: true, fullName: true } } } })
  }

  async update(userId: number, shippingId: number, updateShippingDto: UpdateShippingDto): Promise<{ message: string, shipping: Shipping }> {
    await this.shippingRepository.findOneOrThrow({ where: { id: shippingId, userId } })

    const updatedShipping = await this.shippingRepository.update({ where: { id: shippingId }, data: updateShippingDto })

    return { message: ShippingMessages.UpdatedShippingSuccess, shipping: updatedShipping }
  }

  async remove(userId: number, shippingId: number): Promise<{ message: string, shipping: Shipping }> {
    await this.shippingRepository.findOneOrThrow({ where: { id: shippingId, userId } })

    const removedShipping = await this.shippingRepository.delete({ where: { id: shippingId } })    

    return { message: ShippingMessages.RemovedShippingSuccess, shipping: removedShipping }
  }
}
