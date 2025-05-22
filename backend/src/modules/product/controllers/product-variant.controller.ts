import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { ProductVariantService } from '../services/product-variant.service';
import { CreateProductVariantDto } from '../dto/create-product-variant.dto';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from '@prisma/client';
import { Roles } from '../../../common/decorators/role.decorator';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { UpdateProductVariantDto } from '../dto/update-product-variant.dto';
import { QueryProductVariantDto } from '../dto/query-product-variant.dto';
import { SkipAuth } from '../../../common/decorators/skip-auth.decorator';

@Controller('product-variant')
@ApiTags('product-variant')
@AuthDecorator()
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createProductVariantDto: CreateProductVariantDto, @GetUser() user: User) {
    return this.productVariantService.create(user.id, createProductVariantDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryProductVariantDto: QueryProductVariantDto) {
    return this.productVariantService.findAll(queryProductVariantDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productVariantService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductVariantDto: UpdateProductVariantDto, @GetUser() user: User) {
    return this.productVariantService.update(user.id, id, updateProductVariantDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productVariantService.remove(user.id, id);
  }
}
