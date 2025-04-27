import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseIntPipe, Query } from '@nestjs/common';
import { GalleryItemService } from '../services/gallery-item.service';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express"
import { memoryStorage } from 'multer'
import { FileValidatorPipe } from '../../../common/pipes/file-validator.pipe';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { Roles } from '../../../common/decorators/role.decorator';
import { GalleryItemQueryDto } from '../dto/gallery-item-query.dto';
import { MoveGalleryItemDto } from '../dto/move-gallery-item.dto';
import { DuplicateGalleryItemDto } from '../dto/duplicate-gallery-item.dto';

@Controller('gallery-item')
@ApiTags('gallery-item')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class GalleryItemController {
  constructor(private readonly galleryItemService: GalleryItemService) { }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage(), limits: { files: 1 } }))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(@UploadedFile(FileValidatorPipe) file: Express.Multer.File, @Body() createGalleryItemDto: CreateGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.create(user.id, file, createGalleryItemDto);
  }

  @Get()
  findAll(@Query() galleryItemsQueryDto: GalleryItemQueryDto, @GetUser() user: User) {
    return this.galleryItemService.findAll(user.id, galleryItemsQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.galleryItemService.findOne(id, user.id);
  }

  @Patch('move/:id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  move(@Param("id", ParseIntPipe) id: number, @Body() moveGalleryItemDto: MoveGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.move(id, user.id, moveGalleryItemDto)
  }
  
  @Patch('duplicate/:id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  duplicate(@Param("id", ParseIntPipe) id: number, @Body() duplicateGalleryItemDto: DuplicateGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.duplicate(id, user.id, duplicateGalleryItemDto)
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGalleryItemDto: UpdateGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.update(id, user.id, updateGalleryItemDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.galleryItemService.remove(id, user.id);
  }
}
