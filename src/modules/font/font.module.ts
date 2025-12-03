import { Module } from '@nestjs/common';
import { FontService } from './font.service';
import { FontController } from './font.controller';
import { AuthModule } from '../auth/auth.module';
import { FontRepository } from './font.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Module({
  imports: [AuthModule],
  controllers: [FontController],
  providers: [FontService, FontRepository, GalleryItemRepository],
})
export class FontModule {}
