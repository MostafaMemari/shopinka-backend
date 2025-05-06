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

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
