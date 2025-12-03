import { PartialType } from '@nestjs/swagger';
import { CreateCustomStickerDto } from './create-custom-sticker.dto';

export class UpdateCustomStickerDto extends PartialType(CreateCustomStickerDto) {}
