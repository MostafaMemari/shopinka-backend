import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { QueryTagDto } from './dto/query-tag.dto';

@Controller('tag')
@ApiTags('tag')
@AuthDecorator()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createTagDto: CreateTagDto, @GetUser() user: User) {
    return this.tagService.create(user.id, createTagDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryTagDto: QueryTagDto) {
    return this.tagService.findAll(queryTagDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto, @GetUser() user: User) {
    return this.tagService.update(user.id, id, updateTagDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tagService.remove(user.id, id);
  }
}
