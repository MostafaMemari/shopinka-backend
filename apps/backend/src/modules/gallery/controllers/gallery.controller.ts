import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GalleryService } from '../services/gallery.service';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { Roles } from '../../../common/decorators/role.decorator';

@Controller('gallery')
@ApiTags('gallery')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createGalleryDto: CreateGalleryDto, @GetUser() user: User) {
    return this.galleryService.create(user.id, createGalleryDto);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.galleryService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGalleryDto: UpdateGalleryDto, @GetUser() user: User) {
    return this.galleryService.update(id, user.id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
