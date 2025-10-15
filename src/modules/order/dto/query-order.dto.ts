import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, IsBoolean, IsDate, IsString, IsEnum, Max, Min, IsNotEmpty } from 'class-validator';
import { SortOrder } from 'src/common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { OrderSortBy, QueryOrderStatus } from '../enums/order-sort-by.enum';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class QueryOrderDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  orderNumber?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  addressId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  userId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeTransaction?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeItems?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeUser?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeShippingInfo?: boolean;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(200_000_000)
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    minimum: 1000,
    maximum: 200_000_000,
    nullable: true,
    required: false,
  })
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1000)
  @Max(200_000_000)
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    minimum: 1000,
    maximum: 200_000_000,
    nullable: true,
    required: false,
  })
  minPrice?: number;

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
  @IsEnum(OrderSortBy)
  @ApiPropertyOptional({
    type: 'string',
    enum: OrderSortBy,
  })
  sortBy?: OrderSortBy;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: SortOrder,
  })
  sortDirection?: SortOrder;
}
export class QueryMyOrderDto extends PaginationDto {
  @IsOptional()
  @IsEnum(QueryOrderStatus)
  @ApiProperty({ enum: QueryOrderStatus, type: 'string', required: false, nullable: true })
  status?: QueryOrderStatus;
}
