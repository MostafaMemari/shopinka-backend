import { Module } from '@nestjs/common';
import { CustomStickerService } from './custom-sticker.service';
import { CustomStickerController } from './custom-sticker.controller';
import { CustomStickerRepository } from './custom-sticker.repository';
import { FontRepository } from '../font/font.repository';
import { MaterialStickerRepository } from '../material-sticker/material-sticker.repository';
import { AuthModule } from '../auth/auth.module';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  imports: [AuthModule],
  controllers: [CustomStickerController],
  providers: [CustomStickerService, CustomStickerRepository, FontRepository, MaterialStickerRepository, GalleryItemRepository],
})
export class CustomStickerModule {}
