import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateGalleryItemDto {
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: false,
    required: true,
  })
  galleryId: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isWatermarked?: boolean;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  description?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true, isArray: true })
  image: Express.Multer.File[];
}
