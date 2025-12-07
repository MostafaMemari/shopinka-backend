import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { MaterialStickerService } from './material-sticker.service';
import { CreateMaterialStickerDto } from './dto/create-material-sticker.dto';
import { UpdateMaterialStickerDto } from './dto/update-material-sticker.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '@prisma/client';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { MaterialStickerQueryFilterDto } from './dto/material-sticker-query-filter.dto';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';

@Controller('material-sticker')
@ApiTags('material-sticker')
@AuthDecorator()
export class MaterialStickerController {
  constructor(private readonly materialStickerService: MaterialStickerService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() createMaterialStickerDto: CreateMaterialStickerDto) {
    return this.materialStickerService.create(createMaterialStickerDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() materialQueryFilter: MaterialStickerQueryFilterDto) {
    return this.materialStickerService.findAll(materialQueryFilter);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialStickerService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateMaterialStickerDto: UpdateMaterialStickerDto) {
    console.log(updateMaterialStickerDto);

    return this.materialStickerService.update(id, updateMaterialStickerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.materialStickerService.remove(+id);
  }
}
