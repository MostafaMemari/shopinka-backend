import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { UserRepository } from '../user/user.repository';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '../cache/cache.service';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, UserRepository, AuthService, CacheService, GalleryItemRepository],
})
export class ProductModule { }
