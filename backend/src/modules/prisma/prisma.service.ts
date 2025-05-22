import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CacheKeys } from '../../common/enums/cache.enum';
import { CacheService } from '../cache/cache.service';

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
      const { action } = params;

      if (['create', 'update', 'delete', 'updateMany', 'deleteMany', 'createMany', 'createManyAndReturn'].includes(action)) {
        //* Clear cache
        for (const key in CacheKeys) await this.cacheService.delByPattern(`${CacheKeys[key]}*`);
      }

      return next(params);
    });
  }
}
