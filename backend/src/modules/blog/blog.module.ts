import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { CategoryRepository } from '../category/category.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [BlogController],
  providers: [
    BlogService,
    BlogRepository,
    AuthService,
    UserRepository,
    CategoryRepository,
    CacheService
  ],
})
export class BlogModule {}
