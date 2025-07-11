import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { TagRepository } from '../tag/tag.repository';

@Module({
  controllers: [AiController],
  providers: [AiService, TagRepository],
})
export class AiModule {}
