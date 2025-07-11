import { PartialType } from '@nestjs/swagger';
import { CreateAttributeValueDto } from './create-attribute-value.dto';

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {}
