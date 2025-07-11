import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @MaxLength(100)
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    minLength: 3,
    maxLength: 100,
  })
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @MinLength(3)
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
    minLength: 3,
  })
  description?: string;
}
