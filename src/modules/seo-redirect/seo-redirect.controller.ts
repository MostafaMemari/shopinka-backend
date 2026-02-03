import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';

import { SeoRedirectService } from './seo-redirect.service';
import { CreateSeoRedirectDto } from './dto/create-seo-redirect.dto';
import { UpdateSeoRedirectDto } from './dto/update-seo-redirect.dto';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { Roles } from '../../common/decorators/role.decorator';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { AuthDecorator } from '../../common/decorators/auth.decorator';

@Controller('seo-redirect')
@ApiTags('seo-redirect')
@AuthDecorator()
export class SeoRedirectController {
  constructor(private readonly seoRedirectService: SeoRedirectService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() createSeoRedirectDto: CreateSeoRedirectDto) {
    return this.seoRedirectService.create(createSeoRedirectDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.seoRedirectService.findAll(paginationDto);
  }

  @Get('stats/summary')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  stats() {
    return this.seoRedirectService.stats();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seoRedirectService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateSeoRedirectDto: UpdateSeoRedirectDto) {
    return this.seoRedirectService.update(id, updateSeoRedirectDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seoRedirectService.remove(id);
  }
}
