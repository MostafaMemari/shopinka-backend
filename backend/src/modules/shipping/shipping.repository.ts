import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Shipping, Prisma } from "generated/prisma";
import { ShippingMessages } from "./enums/shipping-messages.enum";

@Injectable()
export class ShippingRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.ShippingCreateArgs): Promise<Shipping> {
        return this.prismaService.shipping.create(args);
    }

    findAll(args: Prisma.ShippingFindManyArgs = {}): Promise<Shipping[]> {
        return this.prismaService.shipping.findMany(args)
    }

    findOne(args: Prisma.ShippingFindFirstArgs): Promise<Shipping | null> {
        return this.prismaService.shipping.findFirst(args)
    }

    update(args: Prisma.ShippingUpdateArgs): Promise<Shipping> {
        return this.prismaService.shipping.update(args)
    }

    delete(args: Prisma.ShippingDeleteArgs): Promise<Shipping> {
        return this.prismaService.shipping.delete(args)
    }

    async findOneOrThrow(args: Prisma.ShippingFindFirstArgs): Promise<Shipping | never> {
        const shipping = await this.findOne(args)

        if (!shipping) throw new NotFoundException(ShippingMessages.NotFoundShipping)

        return shipping
    }
}