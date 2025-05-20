import { Module } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { SeoMetaRepository } from './seo-meta.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { BlogRepository } from '../blog/blog.repository';
import { TagRepository } from '../tag/tag.repository';
import { CategoryRepository } from '../category/category.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  controllers: [SeoController],
  providers: [
    SeoService,
    AuthService,
    UserRepository,
    SeoMetaRepository,
    ProductRepository,
    BlogRepository,
    TagRepository,
    CategoryRepository,
    GalleryItemRepository,
  ],
})
export class SeoModule {}
