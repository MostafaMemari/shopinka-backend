import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { QueryPageDto } from './dto/query-page.dto';
import { PageService } from './page.service';

@Controller('page')
@ApiTags('page')
@AuthDecorator()
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createPageDto: CreatePageDto, @GetUser() user: User) {
    return this.pageService.create(user.id, createPageDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryPageDto: QueryPageDto) {
    return this.pageService.findAll(queryPageDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pageService.findOne(id);
  }

  @Get('by-slug/:slug')
  @SkipAuth()
  findOneBySlug(@Param('slug') slug: string) {
    return this.pageService.findOneBySlug(slug);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePageDto: UpdatePageDto, @GetUser() user: User) {
    return this.pageService.update(user.id, id, updatePageDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.pageService.remove(user.id, id);
  }
}
