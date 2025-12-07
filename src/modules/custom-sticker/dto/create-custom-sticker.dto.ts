import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { transformToBoolean, transformToNumber } from '../../../common/utils/functions.utils';
import { Transform } from 'class-transformer';

export class CreateCustomStickerDto {
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  fontId: number;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  materialId: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  previewImageId?: number;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  width: number;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  height: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  text: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  lineHeight?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  size?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  style?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  weight?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  letterSpacing?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ type: 'string' })
  textAlign?: string;
}
