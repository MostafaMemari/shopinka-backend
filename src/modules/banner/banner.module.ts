import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { BannerRepository } from './banner.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  controllers: [BannerController],
  providers: [BannerService, AuthService, UserRepository, BannerRepository, GalleryItemRepository],
})
export class BannerModule {}
