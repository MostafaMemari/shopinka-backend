import { ApiProperty } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformNumberArray } from '../../../common/utils/functions.utils';
import { BlogStatus } from '@prisma/client';

export class CreateBlogDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(350)
  @ApiProperty({ type: 'string', required: false, nullable: true, maxLength: 350 })
  slug?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  content?: string;

  @IsOptional()
  @IsEnum(BlogStatus)
  @IsNotEmpty()
  @ApiProperty({ enum: BlogStatus, type: 'string', required: false, nullable: true })
  status?: BlogStatus;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  readingTime?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', nullable: true, required: false })
  mainImageId: number;

  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
    isArray: true,
    type: 'array',
    uniqueItems: true,
    items: { type: 'number', nullable: false },
  })
  @Transform(({ value }) => transformNumberArray(value))
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  categoryIds?: number[];

  @IsOptional()
  @ApiProperty({
    required: false,
    nullable: true,
    isArray: true,
    type: 'array',
    uniqueItems: true,
    items: { type: 'number', nullable: false },
  })
  @Transform(({ value }) => transformNumberArray(value))
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  tagIds?: number[];
}
