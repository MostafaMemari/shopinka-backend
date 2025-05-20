import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { ProductRepository } from './repositories/product.repository';
import { UserRepository } from '../user/user.repository';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '../cache/cache.service';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { AttributeRepository } from '../attribute/repositories/attribute.repository';
import { ProductVariantRepository } from './repositories/product-variant.repository';
import { ProductVariantService } from './services/product-variant.service';
import { ProductVariantController } from './controllers/product-variant.controller';
import { FavoriteRepository } from './repositories/favorite.repository';
import { CategoryRepository } from '../category/category.repository';
import { AttributeValueRepository } from '../attribute/repositories/attribute-value.repository';
import { OrderItemRepository } from '../order/repositories/order-item.repository';
import { TagRepository } from '../tag/tag.repository';

@Module({
  controllers: [ProductController, ProductVariantController],
  providers: [
    ProductService,
    ProductRepository,
    UserRepository,
    AuthService,
    CacheService,
    GalleryItemRepository,
    AttributeRepository,
    ProductVariantRepository,
    ProductVariantService,
    FavoriteRepository,
    CategoryRepository,
    AttributeValueRepository,
    OrderItemRepository,
    TagRepository,
  ],
})
export class ProductModule {}
