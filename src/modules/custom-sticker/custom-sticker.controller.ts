import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { CustomStickerService } from './custom-sticker.service';
import { CreateCustomStickerDto } from './dto/create-custom-sticker.dto';
import { UpdateCustomStickerDto } from './dto/update-custom-sticker.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Role, User } from '@prisma/client';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { Roles } from '../../common/decorators/role.decorator';
import { CustomStickerQueryDto } from './dto/custom-sticker-query-filter.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Controller('custom-sticker')
@ApiTags('custom-sticker')
@AuthDecorator()
export class CustomStickerController {
  constructor(private readonly customStickerService: CustomStickerService) {}
  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createCustomStickerDto: CreateCustomStickerDto, @GetUser() user: User) {
    return this.customStickerService.create(user.id, createCustomStickerDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.customStickerService.findAll(user.id, paginationDto);
  }

  @Get('admin')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllByAdmin(@Query() customStickerQueryDto: CustomStickerQueryDto) {
    return this.customStickerService.findAllByAdmin(customStickerQueryDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.customStickerService.findOne(user.id, id);
  }

  @Get('admin/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOneByAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.customStickerService.findOneByAdmin(id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCustomStickerDto: UpdateCustomStickerDto, @GetUser() user: User) {
    return this.customStickerService.update(user.id, id, updateCustomStickerDto);
  }

  @Patch('admin/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  updateByAdmin(@Param('id', ParseIntPipe) id: number, @Body() updateCustomStickerDto: UpdateCustomStickerDto) {
    return this.customStickerService.updateByAdmin(id, updateCustomStickerDto);
  }

  @Delete('admin/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  removeByAdmin(@Param('id', ParseIntPipe) id: number) {
    return this.customStickerService.removeByAdmin(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.customStickerService.remove(user.id, id);
  }
}
