import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AuthService } from '../auth/auth.service';
import { AddressRepository } from './address.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AuthService, AddressRepository, UserRepository],
})
export class AddressModule {}
