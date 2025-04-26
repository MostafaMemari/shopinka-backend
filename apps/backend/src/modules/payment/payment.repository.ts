import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Transaction } from "generated/prisma";

@Injectable()
export class PaymentRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.TransactionCreateArgs): Promise<Transaction> {
        return this.prismaService.transaction.create(args)
    }

    findAll(args: Prisma.TransactionFindManyArgs): Promise<Transaction[]> {
        return this.prismaService.transaction.findMany(args)
    }

    update(args: Prisma.TransactionUpdateArgs): Promise<Transaction> {
        return this.prismaService.transaction.update(args)
    }
}