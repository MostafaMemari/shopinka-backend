import { Address, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressMessages } from '../enums/address-messages.enum';
import { CreateAddressDto } from '../dto/create-address.dto';

@Injectable()
export class AddressRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createWithDefault(userId: number, data: CreateAddressDto): Promise<Address> {
    return this.prismaService.$transaction(async (prisma) => {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });

      return prisma.address.create({
        data: {
          ...data,
          userId,
          isDefault: true,
        },
      });
    });
  }

  async setDefault(userId: number, addressId: number) {
    return this.prismaService.$transaction(async (prisma) => {
      await prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });

      return prisma.address.update({
        where: { id: addressId },
        data: { isDefault: true },
      });
    });
  }

  create(args: Prisma.AddressCreateArgs): Promise<Address> {
    return this.prismaService.address.create(args);
  }

  findAll(args: Prisma.AddressFindManyArgs = {}): Promise<Address[]> {
    return this.prismaService.address.findMany(args);
  }

  findOne(args: Prisma.AddressFindFirstArgs): Promise<Address | null> {
    return this.prismaService.address.findFirst(args);
  }

  update(args: Prisma.AddressUpdateArgs): Promise<Address> {
    return this.prismaService.address.update(args);
  }

  delete(args: Prisma.AddressDeleteArgs): Promise<Address> {
    return this.prismaService.address.delete(args);
  }

  async findOneOrThrow(args: Prisma.AddressFindFirstArgs): Promise<Address | never> {
    const address = await this.findOne(args);

    if (!address) throw new NotFoundException(AddressMessages.NotFoundAddress);

    return address;
  }

  async findLatestByUser(userId: number) {
    return this.prismaService.address.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
