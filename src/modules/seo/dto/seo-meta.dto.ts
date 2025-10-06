import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { EntityType, RobotsMetaTag } from '../enums/seo-meta.enum';

export class SeoMetaDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => String)
  @IsNotEmpty()
  @ApiProperty({ type: 'array', isArray: true, items: { type: 'string', nullable: false }, required: false, nullable: true })
  keywords?: string[];

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  canonicalUrl?: string;

  @IsOptional()
  @IsEnum(RobotsMetaTag)
  @IsNotEmpty()
  @ApiProperty({ enum: RobotsMetaTag, type: 'string', required: false, nullable: true })
  robotsTag?: RobotsMetaTag;

  @IsEnum(EntityType)
  @IsNotEmpty()
  @ApiProperty({ enum: EntityType, type: 'string', required: true, nullable: false })
  entityType?: EntityType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  productId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  blogId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  tagId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  categoryId?: number;
}
