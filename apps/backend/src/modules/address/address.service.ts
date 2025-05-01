import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './address.repository';
import { Address, Prisma } from 'generated/prisma';
import { QueryAddressDto } from './dto/query-address.dto';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { CacheService } from '../cache/cache.service';
import { pagination } from '../../common/utils/pagination.utils';
import { AddressMessages } from './enums/address-messages.enum';

@Injectable()
export class AddressService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(private readonly cacheService: CacheService, private readonly addressRepository: AddressRepository) { }

  async create(userId: number, createAddressDto: CreateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { postalCode: createAddressDto.postalCode } })

    if (address) throw new ConflictException(AddressMessages.AlreadyExistsAddress)

    const newAddress = await this.addressRepository.create({ data: { ...createAddressDto, userId } })

    return { message: AddressMessages.CreatedAddressSuccess, address: newAddress }
  }

  async findAll(userId: number, { page, take, ...queryAddressDto }: QueryAddressDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { address, city, description, endDate, postalCode, province, receiverMobile, sortBy, sortDirection, startDate } = queryAddressDto;

    const sortedDto = sortObject(queryAddressDto);

    const cacheKey = `${CacheKeys.Addresses}_${JSON.stringify(sortedDto)}`;

    const cachedAddresses = await this.cacheService.get<null | Address[]>(cacheKey);

    if (cachedAddresses) return { ...pagination(paginationDto, cachedAddresses) }

    const filters: Prisma.AddressWhereInput = { userId };

    if (address) filters.address = { contains: address, mode: 'insensitive' }
    if (city) filters.city = { contains: city, mode: 'insensitive' }
    if (receiverMobile) filters.receiverMobile = { contains: receiverMobile, mode: 'insensitive' }
    if (province) filters.province = { contains: province, mode: 'insensitive' }
    if (postalCode) filters.postalCode = { contains: postalCode, mode: 'insensitive' }
    if (description) filters.description = { contains: description, mode: 'insensitive' }
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const addresses = await this.addressRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
    });

    await this.cacheService.set(cacheKey, addresses, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, addresses) }
  }

  findOne(userId: number, id: number): Promise<never | Address> {
    return this.addressRepository.findOneOrThrow({ where: { id, userId } })
  }

  async update(userId: number, id: number, updateAddressDto: UpdateAddressDto): Promise<{ message: string, address: Address }> {
    const address = await this.addressRepository.findOne({ where: { userId: { not: userId }, postalCode: updateAddressDto.postalCode } })

    if (address) throw new ConflictException(AddressMessages.AlreadyExistsAddress)

    const updatedAddress = await this.addressRepository.update({ where: { userId, id }, data: updateAddressDto })

    return { message: AddressMessages.UpdatedAddressSuccess, address: updatedAddress }
  }

  async remove(userId: number, id: number): Promise<{ message: string, address: Address }> {
    await this.addressRepository.findOneOrThrow({ where: { id, userId } })

    const removedAddress = await this.addressRepository.delete({ where: { id, userId } })

    return { message: AddressMessages.RemovedAddressSuccess, address: removedAddress }
  }
}
