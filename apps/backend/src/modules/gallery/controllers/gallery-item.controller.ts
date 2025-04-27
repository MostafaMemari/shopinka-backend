import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { GalleryItemService } from '../services/gallery-item.service';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from 'multer'
import { FileValidatorPipe } from '../../../common/pipes/file-validator.pipe';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';

@Controller('gallery-item')
@ApiTags('gallery-item')
export class GalleryItemController {
  constructor(private readonly galleryItemService: GalleryItemService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage(), limits: { fields: 1 } }))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(@UploadedFile(FileValidatorPipe) file: Express.Multer.File, @Body() createGalleryItemDto: CreateGalleryItemDto) {
    console.log(file, createGalleryItemDto)
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
