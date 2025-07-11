import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart-item.dto';

export class UpdateCartItemDto extends PartialType(OmitType(CreateCartItemDto, ['productId', 'productVariantId'])) {}
