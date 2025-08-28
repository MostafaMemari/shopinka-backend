import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { BulkPricingSortBy } from '../enums/bulk-pricing-sort-by.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsEnum, IsOptional, IsNumber, Min, IsNotIn } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { transformToBoolean, transformToNumber } from '../../../common/utils/functions.utils';
import { BulkPricingType } from '@prisma/client';

export class BulkPricingQueryDto extends PaginationDto {
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
  @IsOptional()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  minQty?: number;

  @IsNumber()
  @IsOptional()
  @IsNotIn([0])
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  discount?: number;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ type: 'boolean' })
  @Transform(({ value }) => transformToBoolean(value))
  isGlobal?: boolean;

  @IsOptional()
  @IsEnum(BulkPricingType)
  @ApiPropertyOptional({ type: 'enum', enum: BulkPricingType })
  type?: BulkPricingType;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeProduct?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeVariant?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeUser?: boolean;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  endDate?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(BulkPricingSortBy)
  @ApiPropertyOptional({ type: 'string', enum: BulkPricingSortBy })
  sortBy?: BulkPricingSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ type: 'string', enum: SortOrder })
  sortDirection?: SortOrder;
}
