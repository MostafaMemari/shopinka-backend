import { Injectable } from '@nestjs/common';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';

@Injectable()
export class GalleryItemService {
  create(createGalleryItemDto: CreateGalleryItemDto) {
    return 'This action adds a new galleryItem';
  }

  findAll() {
    return `This action returns all galleryItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galleryItem`;
  }

  update(id: number, updateGalleryItemDto: UpdateGalleryItemDto) {
    return `This action updates a #${id} galleryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} galleryItem`;
  }
}
