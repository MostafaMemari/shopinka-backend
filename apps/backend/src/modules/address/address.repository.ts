import { Address, Prisma } from "generated/prisma";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";
import { AddressMessages } from "./enums/address-messages.enum";

@Injectable()
export class AddressRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.AddressCreateArgs): Promise<Address> {
        return this.prismaService.address.create(args);
    }

    findAll(args: Prisma.AddressFindManyArgs = {}): Promise<Address[]> {
        return this.prismaService.address.findMany(args)
    }

    findOne(args: Prisma.AddressFindFirstArgs): Promise<Address | null> {
        return this.prismaService.address.findFirst(args)
    }

    update(args: Prisma.AddressUpdateArgs): Promise<Address> {
        return this.prismaService.address.update(args)
    }

    delete(args: Prisma.AddressDeleteArgs): Promise<Address> {
        return this.prismaService.address.delete(args)
    }

    async findOneOrThrow(args: Prisma.AddressFindFirstArgs): Promise<Address | never> {
        const address = await this.findOne(args)

        if (!address) throw new NotFoundException(AddressMessages.NotFoundAddress)

        return address
    }
}