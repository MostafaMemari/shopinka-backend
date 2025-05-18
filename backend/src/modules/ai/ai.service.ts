import { Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import aiConfig from '../../configs/ai.config';

@Injectable()
export class AiService {
  async create(createAiDto: CreateAiDto) {
    const {choices,message} = await aiConfig(createAiDto.message)

    return {message , choices}
  }
}
