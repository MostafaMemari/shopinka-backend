import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { transformToNumber } from '../../../common/utils/functions.utils';
import { Transform } from 'class-transformer';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class Seo404LogFilterDto extends PaginationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  path?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  referrer?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  userAgent?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiPropertyOptional({ type: 'number', required: false, nullable: true })
  hitCount?: number;
}
