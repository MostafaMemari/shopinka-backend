import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { QueryBannerDto } from './dto/query-banner.dto';
import { BannerService } from './banner.service';

@Controller('banner')
@ApiTags('banner')
@AuthDecorator()
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createBannerDto: CreateBannerDto) {
    return this.bannerService.create(createBannerDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryBannerDto: QueryBannerDto) {
    return this.bannerService.findAll(queryBannerDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBannerDto: UpdateBannerDto) {
    return this.bannerService.update(id, updateBannerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.remove(id);
  }
}
