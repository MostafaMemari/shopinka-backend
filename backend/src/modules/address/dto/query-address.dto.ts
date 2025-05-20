import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDate, IsString, IsEnum, IsNotEmpty, IsBoolean } from 'class-validator';
import { SortOrder } from '../../../common/enums/shared.enum';
import { AddressSortBy } from '../enums/sortby.enum';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class QueryAddressDto extends PaginationDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  province?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  city?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  address?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  postalCode?: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  receiverMobile?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
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
  includeOrders?: boolean;

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
  @IsEnum(AddressSortBy)
  @ApiProperty({
    type: 'string',
    enum: AddressSortBy,
    nullable: true,
    required: false,
  })
  sortBy?: AddressSortBy;

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
