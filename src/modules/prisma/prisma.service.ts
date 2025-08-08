import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
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
        // for (const key in CacheKeys) await this.cacheService.delByPattern(`${CacheKeys[key]}*`);
      }

      return next(params);
    });
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV == 'production') return;

    const models = Reflect.ownKeys(this).filter((key) => key[0] !== '_');

    await this.banner.deleteMany();
    await this.gallery.deleteMany();

    return Promise.all(models.map((modelKey) => this[modelKey].deleteMany?.()));
  }
}
