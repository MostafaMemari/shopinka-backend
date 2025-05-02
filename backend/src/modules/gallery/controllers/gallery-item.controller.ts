import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseIntPipe, Query, UploadedFiles } from '@nestjs/common';
import { GalleryItemService } from '../services/gallery-item.service';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from "@nestjs/platform-express"
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
import { RemoveGalleryItemDto } from '../dto/remove-gallery-item.dto';
import { RestoreGalleryItemDto } from '../dto/restore-gallery-item.dto';

@Controller('gallery-item')
@ApiTags('gallery-item')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class GalleryItemController {
  constructor(private readonly galleryItemService: GalleryItemService) { }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 5, { storage: memoryStorage(), limits: { files: 5 } }))
  @ApiConsumes(SwaggerConsumes.MultipartData)
  create(@UploadedFiles(FileValidatorPipe) files: Express.Multer.File[], @Body() createGalleryItemDto: CreateGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.create(user.id, files, createGalleryItemDto);
  }

  @Get()
  findAll(@Query() galleryItemsQueryDto: GalleryItemQueryDto, @GetUser() user: User) {
    return this.galleryItemService.findAll(user.id, galleryItemsQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.galleryItemService.findOne(id, user.id);
  }

  @Patch('move')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  move(@Body() moveGalleryItemDto: MoveGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.move(user.id, moveGalleryItemDto)
  }

  @Patch('duplicate')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  duplicate(@Body() duplicateGalleryItemDto: DuplicateGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.duplicate(user.id, duplicateGalleryItemDto)
  }

  @Patch('restore')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  restore(@Body() restoreGalleryItemDto: RestoreGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.restore(user.id, restoreGalleryItemDto)
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGalleryItemDto: UpdateGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.update(id, user.id, updateGalleryItemDto);
  }

  @Delete()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  remove(@Body() removeGalleryItemDto: RemoveGalleryItemDto, @GetUser() user: User) {
    return this.galleryItemService.remove(user.id, removeGalleryItemDto);
  }
}
