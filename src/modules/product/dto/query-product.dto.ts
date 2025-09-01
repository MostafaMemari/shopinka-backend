import {
  IsOptional,
  IsDate,
  IsString,
  IsEnum,
  IsNumber,
  IsPositive,
  IsNotEmpty,
  Max,
  Min,
  IsBoolean,
  IsArray,
  ArrayUnique,
} from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductType } from '@prisma/client';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ProductSortBy } from '../enums/product-sortby.enum';
import { transformNumberArray, transformToBoolean } from '../../../common/utils/functions.utils';

export class QueryProductDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  sku?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  slug?: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
    isArray: true,
    type: 'array',
    uniqueItems: true,
    items: { type: 'number', nullable: false },
  })
  @Transform(({ value }) => transformNumberArray(value))
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  categoryIds?: number[];

  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
    isArray: true,
    type: 'array',
    uniqueItems: true,
    items: { type: 'number', nullable: false },
  })
  @Transform(({ value }) => transformNumberArray(value))
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  tagIds?: number[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  shortDescription?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  quantity?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200_000_000)
  @Min(1000)
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200_000_000)
  @Min(1000)
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @Max(200_000_000)
  @Min(1000)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  salePrice?: number;

  @IsOptional()
  @IsEnum(ProductType)
  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: ProductType, required: false, nullable: true })
  type: ProductType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  width?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  height?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  length?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  weight?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeAttributes?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeSeoMeta?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeSeoCategories?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeTags?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeAttributeValues?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeVariants?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => transformToBoolean(value))
  includeBulkPrices?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeMainImage?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeGalleryImages?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
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
  @IsEnum(ProductSortBy)
  @ApiPropertyOptional({
    type: 'string',
    enum: ProductSortBy,
  })
  sortBy?: ProductSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: SortOrder,
  })
  sortDirection?: SortOrder;
}
