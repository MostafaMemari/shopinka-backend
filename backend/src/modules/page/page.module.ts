import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { PageRepository } from './page.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [PageController],
  providers: [PageService, AuthService, UserRepository, PageRepository, GalleryItemRepository, CacheService],
})
export class PageModule {}
