import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min, IsBoolean } from 'class-validator';
import { transformToBoolean, transformToNumber } from '../../../common/utils/functions.utils';
import { Transform } from 'class-transformer';

export class CreateFontDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  name: string;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  fileId: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  thumbnailId?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  displayName: string;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  lineHeight: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  displayOrder: number;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  size: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isDefault?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isPersian?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @Min(1)
  @ApiPropertyOptional({ type: 'number' })
  difficultyRatio?: number;
}
