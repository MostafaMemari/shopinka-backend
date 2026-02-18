import { Module } from '@nestjs/common';
import { TorobController } from './torob.controller';
import { TorobService } from './torob.service';
import { ProductRepository } from '../product/repositories/product.repository';

@Module({
  controllers: [TorobController],
  providers: [TorobService, ProductRepository],
  exports: [],
})
export class TorobModule {}
