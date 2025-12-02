import { ApiProperty } from '@nestjs/swagger';

export class UploadCustomStickerPreviewImageDto {
  @ApiProperty({ type: 'string', format: 'binary', required: true, isArray: true })
  image: Express.Multer.File[];
}
