import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { Roles } from '../../../common/decorators/role.decorator';
import { QueryGalleriesDto } from '../dto/gallery-query.dto';

@Controller('gallery')
@ApiTags('gallery')
@AuthDecorator()
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) { }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createGalleryDto: CreateGalleryDto, @GetUser() user: User) {
    return this.galleryService.create(user.id, createGalleryDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll(@Query() galleryQueryFiltersDto: QueryGalleriesDto, @GetUser() user: User) {
    return this.galleryService.findAll(user.id, galleryQueryFiltersDto);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.galleryService.findOne(id, user.id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGalleryDto: UpdateGalleryDto, @GetUser() user: User) {
    return this.galleryService.update(id, user.id, updateGalleryDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.galleryService.remove(id, user.id);
  }
}
