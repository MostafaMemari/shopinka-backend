import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { BulkCreateCartItemDto, CreateCartItemDto } from './dto/create-cart-item.dto';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Controller('cart')
@ApiTags('cart')
@AuthDecorator()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('me')
  me(@GetUser() user: User) {
    console.log('cart', new Date().toLocaleString('fa-ir'));
    return this.cartService.me(user.id);
  }

  @Post('clear')
  clear(@GetUser() user: User) {
    return this.cartService.clear(user.id);
  }

  @Get('item')
  findAllItems(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.cartService.findAllItems(user.id, paginationDto);
  }

  @Post('item')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  addItem(@Body() createCatItemDto: CreateCartItemDto, @GetUser() user: User) {
    return this.cartService.addItem(user.id, createCatItemDto);
  }

  @Post('items')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  addItems(@Body() bulkDto: BulkCreateCartItemDto, @GetUser() user: User) {
    console.log(bulkDto);
    return this.cartService.addItems(user.id, bulkDto.items);
  }

  @Patch('item/:id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  updateItem(@Param('id', ParseIntPipe) id: number, @Body() updateCartItemDto: UpdateCartItemDto, @GetUser() user: User) {
    return this.cartService.updateItem(user.id, id, updateCartItemDto);
  }

  @Delete('item/:id')
  removeItem(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.cartService.removeItem(user.id, id);
  }
}
