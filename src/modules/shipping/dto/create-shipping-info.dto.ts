import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsOptional, IsString, IsDate } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateShippingInfoDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'number', required: true, nullable: false })
  @Transform(({ value }) => +value)
  orderId: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', nullable: true, required: false })
  trackingCode: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiPropertyOptional({ type: 'string', format: 'date-time' })
  sentAt?: Date;
}
