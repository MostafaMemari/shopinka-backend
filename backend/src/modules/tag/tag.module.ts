import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { TagRepository } from './tag.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [TagController],
  providers: [TagService, AuthService, UserRepository, TagRepository, GalleryItemRepository, CacheService],
})
export class TagModule {}
