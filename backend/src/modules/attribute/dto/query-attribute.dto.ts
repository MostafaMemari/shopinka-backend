import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDate, IsString, IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { AttributeSortOrder } from '../enums/attribute-sortby.dto';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { AttributeType } from '@prisma/client';

export class QueryAttributeDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  slug?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  userId?: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeUser?: boolean;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeValues?: boolean;

  @IsOptional()
  @IsEnum(AttributeType)
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', enum: AttributeType, nullable: true, required: false })
  type?: AttributeType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  description?: string;

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
  @IsEnum(AttributeSortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: AttributeSortOrder,
  })
  sortBy?: AttributeSortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: SortOrder,
  })
  sortDirection?: SortOrder;
}
