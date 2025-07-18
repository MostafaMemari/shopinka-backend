import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min } from 'class-validator';
import { ProductStatus, ProductType } from '@prisma/client';
import { transformNumberArray } from '../../../common/utils/functions.utils';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ type: 'string', required: false, nullable: true, maxLength: 30 })
  sku?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ApiProperty({ type: 'string', required: true, nullable: false, maxLength: 100 })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(350)
  @ApiProperty({ type: 'string', required: false, nullable: true, maxLength: 350 })
  slug?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(300)
  @ApiProperty({ type: 'string', required: false, nullable: true, maxLength: 300 })
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
  basePrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @Max(200_000_000)
  @Min(1000)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  salePrice?: number;

  @IsOptional()
  @IsEnum(ProductStatus)
  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: ProductStatus, required: false, nullable: true })
  status?: ProductStatus;

  @IsOptional()
  @IsEnum(ProductType)
  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: ProductType, required: false, nullable: true })
  type?: ProductType;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsPositive()
  @ApiProperty({ type: 'number', required: false, nullable: true })
  mainImageId?: number;

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
  galleryImageIds?: number[];

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
  @ApiProperty({
    isArray: true,
    required: false,
    nullable: true,
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
  attributeIds: number[];

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
}
