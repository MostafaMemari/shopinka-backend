import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SurfaceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { transformToNumber } from '../../../common/utils/functions.utils';
import { Transform } from 'class-transformer';

export class CreateMaterialStickerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  colorCode: string;

  @IsString()
  @IsEnum(SurfaceType)
  @ApiProperty({ type: 'string', enum: SurfaceType })
  surface: SurfaceType;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  pricePerCM: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  profitPercent?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  backgroundFrom?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  backgroundTo?: string;
}
