import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from 'generated/prisma';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';

@Controller('cart')
@ApiTags('cart')
@AuthDecorator()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Get('me')
  me(@GetUser() user: User) {
    return this.cartService.me(user.id)
  }

  @Post('clear')
  clear(@GetUser() user: User) {
    return this.cartService.clear(user.id)
  }

  @Post('item')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  addItem(@Body() createCatItemDto: CreateCartItemDto, @GetUser() user: User) {
    return this.cartService.addItem(user.id, createCatItemDto)
  }
}
