import { IsBoolean, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BannerType } from '../enums/banner-type.enum';
import { Transform } from 'class-transformer';

export class CreateBannerDto {
  @ApiProperty({ enum: BannerType })
  @IsEnum(BannerType)
  type: BannerType;

  @ApiProperty()
  @IsString()
  link: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isActive?: boolean;

  @ApiProperty()
  @IsInt()
  imageId: number;
}
