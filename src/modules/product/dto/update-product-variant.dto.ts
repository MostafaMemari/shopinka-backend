import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductVariantDto } from './create-product-variant.dto';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductVariantDto extends PartialType(OmitType(CreateProductVariantDto, ['mainImageId'])) {
  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'null' || value === null) return null;
    return Number.parseInt(String(value)) || 0;
  })
  @ApiProperty({ required: false, nullable: true })
  mainImageId?: number | null;
}

export class SetDefaultVariantDto {
  @IsOptional()
  @Transform(({ value }) => (value === null ? null : +value))
  @IsNumber({}, { message: 'variantId must be a number or null' })
  @IsPositive({ message: 'variantId must be a positive number', each: false })
  @ApiProperty({ type: 'number', required: false, nullable: true })
  variantId: number | null;
}
