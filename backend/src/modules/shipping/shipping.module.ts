import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { ShippingRepository } from './shipping.repository';

@Module({
  controllers: [ShippingController],
  providers: [ShippingService, AuthService, UserRepository, ShippingRepository],
})
export class ShippingModule { }
