import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { CategoryRepository } from './category.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, AuthService, UserRepository, CategoryRepository, GalleryItemRepository],
})
export class CategoryModule {}
