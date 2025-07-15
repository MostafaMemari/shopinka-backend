import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class RetryPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({ type: 'number', required: true, nullable: false })
  @Transform(({ value }) => +value)
  orderId: number;
}
