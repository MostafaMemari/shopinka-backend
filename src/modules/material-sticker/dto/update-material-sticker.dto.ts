import { PartialType } from '@nestjs/swagger';
import { CreateMaterialStickerDto } from './create-material-sticker.dto';

export class UpdateMaterialStickerDto extends PartialType(CreateMaterialStickerDto) {}
