import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly cacheService: CacheService) {
    super();
  }

  private readonly logger = new Logger('PrismaService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected successfully.');
    this.useMiddleware();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Disconnected from database.');
  }

  useMiddleware(): void {
    this.$use(async (params, next) => {
      const { action, model } = params;

      if (
        ['create', 'update', 'delete', 'updateMany', 'deleteMany', 'createMany', 'createManyAndReturn', 'updateManyAndReturn'].includes(
          action,
        )
      ) {
        //* Clear cache
        await this.cacheService.delByPattern(`${Prisma.ModelName[model]}:*`);
      }

      return next(params);
    });
  }
}
