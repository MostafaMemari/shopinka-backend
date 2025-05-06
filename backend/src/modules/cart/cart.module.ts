import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UserRepository } from '../user/user.repository';
import { AuthService } from '../auth/auth.service';
import { CartRepository } from './cart.repository';

@Module({
  controllers: [CartController],
  providers: [CartService, UserRepository, AuthService, CartRepository],
})
export class CartModule { }
