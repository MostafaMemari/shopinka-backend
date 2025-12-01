import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { FontService } from './font.service';
import { CreateFontDto } from './dto/create-font.dto';
import { UpdateFontDto } from './dto/update-font.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { FontQueryDto } from './dto/font-query-filter.dto';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';

@Controller('font')
@AuthDecorator()
@ApiTags('font')
export class FontController {
  constructor(private readonly fontService: FontService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createFontDto: CreateFontDto) {
    return this.fontService.create(createFontDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() fontQueryFilterDto: FontQueryDto) {
    return this.fontService.findAll(fontQueryFilterDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fontService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFontDto: UpdateFontDto) {
    return this.fontService.update(id, updateFontDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fontService.remove(id);
  }
}
