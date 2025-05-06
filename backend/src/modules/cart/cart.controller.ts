import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'generated/prisma';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';

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
  clear(@GetUser() user: User){
    return this.cartService.clear(user.id)
  }
}
