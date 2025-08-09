import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { BannerRepository } from './banner.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [BannerController],
  providers: [BannerService, BannerRepository, GalleryItemRepository],
  exports: [BannerService, BannerRepository, GalleryItemRepository, AuthModule],
})
export class BannerModule {}
