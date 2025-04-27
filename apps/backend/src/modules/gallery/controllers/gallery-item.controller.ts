import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GalleryItemService } from '../services/gallery-item.service';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('gallery-item')
@ApiTags('gallery-item')
export class GalleryItemController {
  constructor(private readonly galleryItemService: GalleryItemService) { }

  @Post()
  create(@Body() createGalleryItemDto: CreateGalleryItemDto) {
    return this.galleryItemService.create(createGalleryItemDto);
  }

  @Get()
  findAll() {
    return this.galleryItemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryItemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryItemDto: UpdateGalleryItemDto) {
    return this.galleryItemService.update(+id, updateGalleryItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryItemService.remove(+id);
  }
}
