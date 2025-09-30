import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { AuthService } from '../auth/auth.service';
import { AddressRepository } from './repositories/address.repository';
import { UserRepository } from '../user/user.repository';
import { AddressSnapshotRepository } from './repositories/address-snapshot.repository';

@Module({
  controllers: [AddressController],
  providers: [AddressService, AuthService, AddressRepository, UserRepository, AddressSnapshotRepository],
})
export class AddressModule {}
