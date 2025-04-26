import { Module } from '@nestjs/common';
import { GalleryService } from './services/gallery.service';
import { GalleryController } from './controllers/gallery.controller';
import { GalleryRepository } from './repositories/gallery.repository';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [GalleryController],
  providers: [GalleryService, GalleryRepository, AuthService , UserRepository , CacheService],
})
export class GalleryModule { }
