import { Module } from '@nestjs/common';
import { FontService } from './font.service';
import { FontController } from './font.controller';
import { AuthModule } from '../auth/auth.module';
import { FontRepository } from './font.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [AuthModule],
  controllers: [FontController],
  providers: [FontService, FontRepository, CacheService, GalleryItemRepository],
})
export class FontModule {}
