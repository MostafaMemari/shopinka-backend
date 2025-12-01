import { SurfaceType } from '@prisma/client';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum, IsNumber, IsDate } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { transformToNumber } from '../../../common/utils/functions.utils';
import { Transform } from 'class-transformer';
import { MaterialStickerSortBy } from '../enums/material-sticker-sort-by.enum';

export class MaterialStickerQueryFilterDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  colorCode?: string;

  @IsOptional()
  @IsEnum(SurfaceType)
  @ApiPropertyOptional({ type: 'string', enum: SurfaceType })
  surface?: SurfaceType;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  pricePerCM?: number;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  profitPercent?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  backgroundFrom?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  backgroundTo?: string;

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
  @IsEnum(MaterialStickerSortBy)
  @ApiPropertyOptional({ type: 'string', enum: MaterialStickerSortBy })
  sortBy?: MaterialStickerSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ type: 'string', enum: SortOrder })
  sortDirection?: SortOrder;
}
