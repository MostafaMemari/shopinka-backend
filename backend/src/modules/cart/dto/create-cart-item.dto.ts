import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';

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

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: true, nullable: false })
  quantity: number;
}
