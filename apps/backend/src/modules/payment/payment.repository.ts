import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Transaction } from "generated/prisma";

@Injectable()
export class PaymentRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.TransactionCreateArgs): Promise<Transaction> {
        return this.prismaService.transaction.create(args)
    }
}