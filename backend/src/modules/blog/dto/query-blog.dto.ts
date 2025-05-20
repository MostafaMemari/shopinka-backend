import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsDate, IsEnum, IsString } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { BlogSortBy } from '../enums/blog-sortby.enum';

export class QueryBlogDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  title?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiProperty({
    type: 'boolean',
    nullable: true,
    required: false,
  })
  includeCategories?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiProperty({
    type: 'boolean',
    nullable: true,
    required: false,
  })
  includeTags?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiProperty({
    type: 'boolean',
    nullable: true,
    required: false,
  })
  includeUser?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiProperty({
    type: 'boolean',
    nullable: true,
    required: false,
  })
  includeSeoMeta?: boolean;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiProperty({ type: 'boolean', nullable: true, required: false })
  includeMainImage?: boolean;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ type: 'string', format: 'date-time', nullable: true, required: false })
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({ type: 'string', format: 'date-time', nullable: true, required: false })
  endDate?: Date;

  @IsOptional()
  @IsString()
  @IsEnum(BlogSortBy)
  @ApiProperty({
    type: 'string',
    enum: BlogSortBy,
    nullable: true,
    required: false,
  })
  sortBy?: BlogSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiProperty({
    type: 'string',
    enum: SortOrder,
    nullable: true,
    required: false,
  })
  sortDirection?: SortOrder;
}
