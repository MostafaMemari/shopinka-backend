import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './address.repository';
import { Address } from 'generated/prisma';

@Injectable()
export class AddressService {
  constructor(private readonly addressRepository: AddressRepository) { }

  async create(userId: number, createAddressDto: CreateAddressDto) {
    const address = await this.addressRepository.findOne({ where: { postalCode: createAddressDto.postalCode } })

    if (address) throw new ConflictException("Address with this postal code already exists.")

    const newAddress = await this.addressRepository.create({ data: { ...createAddressDto, userId } })

    return { message: "Address created successfully.", address: newAddress }
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(userId: number, id: number): Promise<never | Address> {
    return this.addressRepository.findOneOrThrow({ where: { id, userId } })
  }

  async update(userId: number, id: number, updateAddressDto: UpdateAddressDto): Promise<{ message: string, address: Address }> {
    const address = await this.addressRepository.findOne({ where: { userId: { not: userId }, postalCode: updateAddressDto.postalCode } })

    if (address) throw new ConflictException("Address with this postal code already exists.")

    const updatedAddress = await this.addressRepository.update({ where: { userId, id }, data: updateAddressDto })

    return { message: "Updated address successfully.", address: updatedAddress }
  }

  async remove(userId: number, id: number): Promise<{ message: string, address: Address }> {
    await this.addressRepository.findOneOrThrow({ where: { id, userId } })

    const removedAddress = await this.addressRepository.delete({ where: { id, userId } })

    return { message: "Removed address successfully.", address: removedAddress }
  }
}
