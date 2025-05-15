import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { CategoryRepository } from '../category/category.repository';
import { CacheService } from '../cache/cache.service';
import { TagRepository } from '../tag/tag.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  controllers: [BlogController],
  providers: [
    BlogService,
    BlogRepository,
    AuthService,
    UserRepository,
    CategoryRepository,
    CacheService,
    TagRepository,
    GalleryItemRepository
  ],
})
export class BlogModule { }
