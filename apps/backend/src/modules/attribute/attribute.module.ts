import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { CacheService } from '../cache/cache.service';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { AttributeRepository } from './repositories/attribute.repository';

@Module({
  controllers: [AttributeController],
  providers: [AttributeService, CacheService, AuthService, UserRepository, AttributeRepository],
})
export class AttributeModule { }
