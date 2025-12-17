import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { transformToNumber } from '../../../common/utils/functions.utils';
import { Transform, Type } from 'class-transformer';
import { CustomStickerLineDto } from './custom-sticker-line.dto';

export class CreateCustomStickerDto {
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  fontId: number;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  materialId: number;

  @ApiProperty({
    type: [CustomStickerLineDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomStickerLineDto)
  lines: CustomStickerLineDto[];

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  previewImageId?: number;

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
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;
}
