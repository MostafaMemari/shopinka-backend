import { Controller, Get, Param, Delete, Query, ParseIntPipe, Post, Body, Req } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { type Request } from 'express';

import { Seo404LogService } from './seo-404-log.service';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Seo404LogFilterDto } from './dto/seo-404-log-filter.dto';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { CreateSeoRedirectDto } from '../seo-redirect/dto/create-seo-redirect.dto';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { CreateSeo404LogDto } from './dto/create-seo-404-log.dto';

@Controller('seo-404-log')
@ApiTags('seo-404-log')
@AuthDecorator()
export class Seo404LogController {
  constructor(private readonly seo404LogService: Seo404LogService) {}

  @Post()
  @SkipAuth()
  @ApiTags('seo-404-log')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  register(@Body() dto: CreateSeo404LogDto, @Req() req: Request) {
    const userAgent = dto.userAgent || (req.headers['user-agent'] as string | undefined);
    return this.seo404LogService.registerHit(dto.path, dto.referrer, userAgent).then((log) => ({ resData: log }));
  }

  @Get('popular-links')
  @SkipAuth()
  popularLinks() {
    return this.seo404LogService.popularLinks().then((links) => ({ resData: links }));
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll(@Query() seo404LogFilterDto: Seo404LogFilterDto) {
    return this.seo404LogService.findAll(seo404LogFilterDto);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seo404LogService.findOne(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seo404LogService.remove(id);
  }

  @Post(':id/redirect')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiTags('seo-404-log')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  createRedirectFromLog(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSeoRedirectDto) {
    return this.seo404LogService.createRedirectFromLog(id, dto);
  }
}
