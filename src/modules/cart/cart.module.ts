import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserRepository } from '../user/user.repository';
import { AuthService } from '../auth/auth.service';
import { CartRepository } from './repositories/cart.repository';
import { CartItemRepository } from './repositories/cardItem.repository';

@Module({
  controllers: [CartController],
  providers: [CartService, UserRepository, AuthService, CartRepository, CartItemRepository],
})
export class CartModule {}
