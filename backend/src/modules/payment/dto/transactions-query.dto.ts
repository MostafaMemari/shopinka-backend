import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, Min, Max, IsString, IsDate, IsEnum, IsBoolean } from 'class-validator';
import { TransactionStatus } from 'generated/prisma';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { TransactionsSortBy } from '../enums/sortby.enum';

export class QueryTransactionsDto extends PaginationDto {
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
  minAmount?: number;

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
  maxAmount?: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  authority?: string;

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
  includeOrder?: boolean;

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
  @IsEnum(TransactionStatus)
  @ApiProperty({
    type: 'string',
    enum: TransactionStatus,
    nullable: true,
    required: false,
  })
  status?: TransactionStatus;

  @IsOptional()
  @IsString()
  @IsEnum(TransactionsSortBy)
  @ApiProperty({
    type: 'string',
    enum: TransactionsSortBy,
    nullable: true,
    required: false,
  })
  sortBy?: 'createdAt' | 'updatedAt' | 'amount';

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiProperty({
    type: 'string',
    enum: SortOrder,
    nullable: true,
    required: false,
  })
  sortDirection?: 'asc' | 'desc';
}
