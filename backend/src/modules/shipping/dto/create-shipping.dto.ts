import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateShippingDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  name: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: true, nullable: false })
  price: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({ type: 'number', required: false, nullable: true })
  estimatedDays?: number;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isActive?: boolean;
}
