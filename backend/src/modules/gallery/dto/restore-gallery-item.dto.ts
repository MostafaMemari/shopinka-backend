import { OmitType } from '@nestjs/swagger';
import { MoveGalleryItemDto } from './move-gallery-item.dto';

export class RestoreGalleryItemDto extends OmitType(MoveGalleryItemDto, ['galleryId']) {}
