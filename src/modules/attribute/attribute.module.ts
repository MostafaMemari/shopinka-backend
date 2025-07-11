import { Module } from '@nestjs/common';
import { AttributeService } from './services/attribute.service';
import { AttributeController } from './controllers/attribute.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeValueService } from './services/attribute-value.service';
import { AttributeValueController } from './controllers/attribute-value.controller';
import { AttributeValueRepository } from './repositories/attribute-value.repository';

@Module({
  controllers: [AttributeController, AttributeValueController],
  providers: [AttributeService, AuthService, UserRepository, AttributeRepository, AttributeValueService, AttributeValueRepository],
})
export class AttributeModule {}
