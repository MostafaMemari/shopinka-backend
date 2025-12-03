import { PartialType } from '@nestjs/swagger';
import { CreateFontDto } from './create-font.dto';

export class UpdateFontDto extends PartialType(CreateFontDto) {}
