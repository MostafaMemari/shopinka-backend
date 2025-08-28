import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BulkPricingType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotIn, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { transformToBoolean, transformToNumber } from '../../../common/utils/functions.utils';

export class CreateBulkPricingDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @Min(1)
  @ApiPropertyOptional({ type: 'number' })
  productId?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  variantId?: number;

  @IsNumber()
  @Min(1)
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  minQty: number;

  @IsNumber()
  @IsNotIn([0])
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  discount: number;

  @IsBoolean()
  @ApiPropertyOptional({ type: 'boolean' })
  @Transform(({ value }) => transformToBoolean(value))
  isGlobal?: boolean;

  @IsEnum(BulkPricingType)
  @ApiProperty({ type: 'enum', enum: BulkPricingType })
  type: BulkPricingType;
}
