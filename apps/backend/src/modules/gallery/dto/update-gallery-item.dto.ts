import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateGalleryItemDto } from './create-gallery-item.dto';

export class UpdateGalleryItemDto extends PartialType(OmitType(CreateGalleryItemDto, ['galleryId'])) { }
