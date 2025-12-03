import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDate, IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { CustomStickerSortBy } from '../enums/custom-sticker-sort-by.dto';
import { transformToBoolean, transformToNumber } from '../../../common/utils/functions.utils';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class CustomStickerQueryDto extends PaginationDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  fontId?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  materialId?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeUser?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeFont?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includePreviewImage?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  width: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  height: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
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
  @ApiProperty({ type: 'string', nullable: true, required: false })
  style?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  weight?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  letterSpacing?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  textAlign?: string;

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
  @IsEnum(CustomStickerSortBy)
  @ApiPropertyOptional({ type: 'string', enum: CustomStickerSortBy })
  sortBy?: CustomStickerSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ type: 'string', enum: SortOrder })
  sortDirection?: SortOrder;
}
