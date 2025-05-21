import { ApiProperty } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { RobotsMetaTag, SeoMetaTargetType } from '../enums/seo-meta.enum';

export class SeoMetaDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @Type(() => String)
  @ApiProperty({ type: 'array', isArray: true, items: { type: 'string' }, required: false, nullable: true })
  keywords?: string[];

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  canonicalUrl?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  ogTitle?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  ogDescription?: string;

  @IsOptional()
  @IsEnum(RobotsMetaTag)
  @ApiProperty({ enum: RobotsMetaTag, required: false, nullable: true })
  robotsTag?: RobotsMetaTag;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === 'null' || value === null) return null;
    return Number.parseInt(String(value)) || 0;
  })
  @ApiProperty({ type: 'number', required: false, nullable: true })
  ogImageId?: number | null;

  @IsNotEmpty()
  @IsEnum(SeoMetaTargetType)
  @ApiProperty({ enum: SeoMetaTargetType })
  targetType: SeoMetaTargetType;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number' })
  targetId: number;
}
