import { Module } from '@nestjs/common';
import { MaterialStickerService } from './material-sticker.service';
import { MaterialStickerController } from './material-sticker.controller';
import { AuthModule } from '../auth/auth.module';
import { MaterialStickerRepository } from './material-sticker.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [AuthModule],
  controllers: [MaterialStickerController],
  providers: [MaterialStickerService, CacheService, MaterialStickerRepository],
})
export class MaterialStickerModule {}
