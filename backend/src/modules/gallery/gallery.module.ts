import { Module } from '@nestjs/common';
import { GalleryService } from './services/gallery.service';
import { GalleryController } from './controllers/gallery.controller';
import { GalleryRepository } from './repositories/gallery.repository';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { CacheService } from '../cache/cache.service';
import { GalleryItemService } from './services/gallery-item.service';
import { GalleryItemController } from './controllers/gallery-item.controller';
import { GalleryItemRepository } from './repositories/gallery-item.repository';
import { AwsService } from '../s3AWS/s3AWS.service';

@Module({
  controllers: [GalleryController, GalleryItemController],
  providers: [
    GalleryService,
    GalleryRepository,
    AuthService,
    UserRepository,
    CacheService,
    GalleryItemService,
    GalleryItemRepository,
    AwsService,
  ],
})
export class GalleryModule {}
