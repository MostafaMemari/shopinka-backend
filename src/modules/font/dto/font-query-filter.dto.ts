import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsBoolean, IsDate, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { SortOrder } from '../../../common/enums/shared.enum';
import { transformToNumber, transformToBoolean } from '../../../common/utils/functions.utils';
import { Transform } from 'class-transformer';
import { FontSortBy } from '../enums/font-sort-by.enum';

export class FontQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  displayName?: string;

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

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  isPersian?: boolean;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number' })
  difficultyRatio?: number;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeFile?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => transformToBoolean(value))
  @ApiPropertyOptional({ type: 'boolean' })
  includeThumbnail?: boolean;

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
  @IsEnum(FontSortBy)
  @ApiPropertyOptional({ type: 'string', enum: FontSortBy })
  sortBy?: FontSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ type: 'string', enum: SortOrder })
  sortDirection?: SortOrder;
}
