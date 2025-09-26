import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './repositories/address.repository';
import { Address, Prisma } from '@prisma/client';
import { QueryAddressDto } from './dto/query-address.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { AddressMessages } from './enums/address-messages.enum';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) {}

  async create(userId: number, createAddressDto: CreateAddressDto) {
    const newAddress = await this.addressRepository.createWithDefault(userId, createAddressDto);

    return {
      message: AddressMessages.CreatedAddressSuccess,
      address: newAddress,
    };
  }

  async setDefault(userId: number, addressId: number) {
    const updated = await this.addressRepository.setDefault(userId, addressId);

    return {
      message: AddressMessages.SetDefaultAddressSuccess,
      address: updated,
    };
  }

  async findAll(userId: number, { page, take, ...queryAddressDto }: QueryAddressDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { city, endDate, postalCode, province, sortBy, sortDirection, startDate } = queryAddressDto;

    const filters: Prisma.AddressWhereInput = { userId };

    if (city) filters.city = { contains: city };
    if (province) filters.province = { contains: province };
    if (postalCode) filters.postalCode = { contains: postalCode };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const addresses = await this.addressRepository.findAll({
      where: { ...filters },
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
    });

    return { ...pagination(paginationDto, addresses) };
  }

  findOne(userId: number, id: number): Promise<never | Address> {
    return this.addressRepository.findOneOrThrow({ where: { id, userId } });
  }

  async update(userId: number, id: number, updateAddressDto: UpdateAddressDto): Promise<{ message: string; address: Address }> {
    const updatedAddress = await this.addressRepository.update({
      where: { userId, id },
      data: {
        ...updateAddressDto,
        unit: updateAddressDto.unit ?? null,
      },
    });

    return { message: AddressMessages.UpdatedAddressSuccess, address: updatedAddress };
  }

  async remove(userId: number, id: number): Promise<{ message: string; address: Address }> {
    await this.addressRepository.findOneOrThrow({ where: { id, userId } });

    const removedAddress = await this.addressRepository.delete({ where: { id } });

    const latestAddress = await this.addressRepository.findLatestByUser(userId);
    if (latestAddress) {
      await this.addressRepository.setDefault(userId, latestAddress.id);
    }

    return {
      message: AddressMessages.RemovedAddressSuccess,
      address: removedAddress,
    };
  }
}
