import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDate, IsString, IsEnum, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { AttributeValueSortOrder } from '../enums/attribute-value-sortby.dto';

export class QueryAttributeValueDto extends PaginationDto {
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
  attributeId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  colorCode?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: 'string', nullable: true, required: false })
  buttonLabel?: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  includeAttribute?: boolean;

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
  @IsEnum(AttributeValueSortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: AttributeValueSortOrder,
  })
  sortBy?: AttributeValueSortOrder;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    type: 'string',
    enum: SortOrder,
  })
  sortDirection?: SortOrder;
}
