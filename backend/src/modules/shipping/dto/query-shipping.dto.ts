import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNotEmpty, IsNumber, IsPositive, Max, Min, IsBoolean, IsDate, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ShippingSortBy } from '../enums/shipping-sortby.enum';
import { SortOrder } from '../../../common/enums/shared.enum';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class QueryShippingDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  name?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200_000_000)
  @Min(1000)
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Max(200_000_000)
  @Min(1000)
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  estimatedDays?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeOrders?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeShippingInfos?: boolean;

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
  @IsEnum(ShippingSortBy)
  @ApiPropertyOptional({
    type: 'string',
    enum: ShippingSortBy,
  })
  sortBy?: ShippingSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: SortOrder,
  })
  sortDirection?: SortOrder;
}
