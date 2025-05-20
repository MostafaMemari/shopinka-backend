import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsDate, IsEnum, IsString } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { GallerySortBy } from '../enums/gallery-sortby.enum';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class QueryGalleriesDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  description?: string;

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
  includeItems?: boolean;

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
  @IsEnum(GallerySortBy)
  @ApiProperty({
    type: 'string',
    enum: GallerySortBy,
    nullable: true,
    required: false,
  })
  sortBy?: GallerySortBy;

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
