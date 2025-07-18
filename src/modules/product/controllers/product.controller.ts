import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from '@prisma/client';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { Roles } from '../../../common/decorators/role.decorator';
import { SkipAuth } from '../../../common/decorators/skip-auth.decorator';
import { QueryProductDto } from '../dto/query-product.dto';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { QueryPublicProductDto } from '../dto/query-public-product.dto';
import { SetDefaultVariantDto } from '../dto/update-product-variant.dto';

@Controller('product')
@ApiTags('product')
@AuthDecorator()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('generate-variants')
  @SkipAuth()
  generateVariants() {
    return this.productService.generateVariantsFromProducts();
  }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createProductDto: CreateProductDto, @GetUser() user: User) {
    return this.productService.create(user.id, createProductDto);
  }

  @Get()
  @SkipAuth()
  findAllPublic(@Query() queryPublicProductDto: QueryPublicProductDto) {
    return this.productService.findAllPublic(queryPublicProductDto);
  }

  @Patch(':id/default-variant')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async setDefaultVariant(@Param('id', ParseIntPipe) id: number, @Body() defaultVariantDto: SetDefaultVariantDto, @GetUser() user: User) {
    return this.productService.setDefaultVariant(user.id, id, defaultVariantDto);
  }

  @Get(':id/favorite')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async getFavorite(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.getFavorite(user.id, id);
  }

  @Get('admin')
  findAllAdmin(@Query() queryProductDto: QueryProductDto) {
    return this.productService.findAllAdmin(queryProductDto);
  }

  @Get('drafts')
  findAllDrafts(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.productService.findAllDrafts(user.id, paginationDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Get('by-slug/:slug')
  @SkipAuth()
  findOneBySlug(@Param('slug') slug: string) {
    return this.productService.findOneBySlug(slug);
  }

  @Get('draft/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOneDraft(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.findOneDraft(user.id, id);
  }

  @Patch('favorite-toggle/:id')
  favoriteToggle(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.favoriteToggle(user.id, id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto, @GetUser() user: User) {
    return this.productService.update(user.id, id, updateProductDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.productService.remove(user.id, id);
  }
}
