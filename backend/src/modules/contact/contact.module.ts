import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { AuthService } from '../auth/auth.service';
import { ContactRepository } from './contact.repository';
import { UserRepository } from '../user/user.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [ContactController],
  providers: [ContactService, AuthService, ContactRepository, UserRepository, CacheService],
})
export class ContactModule {}
