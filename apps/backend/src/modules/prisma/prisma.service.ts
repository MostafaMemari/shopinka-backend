import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit , OnModuleDestroy  {
    private readonly logger = new Logger('PrismaService');

    async onModuleInit() {
        await this.$connect();
        this.logger.log('Database connected successfully.');
    }

    async onModuleDestroy() {
        await this.$disconnect();
        this.logger.log('Disconnected from database.');
    }

}
