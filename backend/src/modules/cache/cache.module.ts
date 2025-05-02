import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class CacheModule { }