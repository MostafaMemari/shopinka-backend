import { PartialType } from '@nestjs/swagger';
import { CreateShippingInfoDto } from './create-shipping-info.dto';

export class UpdateShippingInfoDto extends PartialType(CreateShippingInfoDto) {}
