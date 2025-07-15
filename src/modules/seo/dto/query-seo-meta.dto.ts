import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { EntityType } from '../enums/seo-meta.enum';

export class QuerySeoMetaDto {
  @IsEnum(EntityType)
  @IsNotEmpty()
  @ApiProperty({ enum: EntityType, type: 'string', required: true, nullable: false })
  entityType?: EntityType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  productId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  blogId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  tagId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    nullable: true,
    required: false,
  })
  categoryId?: number;
}
