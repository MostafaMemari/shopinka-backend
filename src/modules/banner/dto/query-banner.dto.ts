import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';
import { BannerType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class QueryBannerDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  name?: string;

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
  includeImage?: boolean;

  @IsOptional()
  @IsEnum(BannerType)
  @ApiProperty({
    enum: BannerType,
    nullable: true,
    required: false,
  })
  type?: BannerType;
}
