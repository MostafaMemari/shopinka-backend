import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive, ValidateNested, IsArray } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateCartItemDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  productId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  productVariantId?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  customStickerId?: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: true, nullable: false })
  quantity: number;
}

export class BulkCreateCartItemDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  @ApiProperty({ type: [CreateCartItemDto] })
  items: CreateCartItemDto[];
}
