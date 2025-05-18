import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('ai')
@ApiTags('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  create(@Body() createAiDto: CreateAiDto) {
    return this.aiService.create(createAiDto);
  }
}
