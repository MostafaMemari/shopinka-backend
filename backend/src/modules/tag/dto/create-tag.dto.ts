import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { TagType } from '@prisma/client';

export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(350)
  @ApiProperty({ type: 'string', required: false, nullable: true, maxLength: 350 })
  slug?: string;

  @IsOptional()
  @IsEnum(TagType)
  @IsNotEmpty()
  @ApiProperty({ type: 'string', enum: TagType, required: false, nullable: true })
  type?: TagType;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  thumbnailImageId?: number;
}
