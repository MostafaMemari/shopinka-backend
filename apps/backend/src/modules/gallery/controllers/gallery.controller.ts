import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() createGalleryDto: CreateGalleryDto, @GetUser() user: User) {
    return this.galleryService.create(createGalleryDto, user);
  }

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(+id, updateGalleryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id);
  }
}
