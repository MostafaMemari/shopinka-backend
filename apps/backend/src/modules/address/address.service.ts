import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressRepository } from './address.repository';

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

  findOne(id: number) {
    return `This action returns a #${id} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
