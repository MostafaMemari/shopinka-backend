import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { transformToNumber } from '../../../common/utils/functions.utils';

export class CalculateBulkPriceDto {
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  productOrVariantId: number;

  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number' })
  quantity: number;
}
