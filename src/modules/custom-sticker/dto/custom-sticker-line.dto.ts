import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsPositive, Min, IsString, Max } from 'class-validator';
import { transformToNumber } from 'src/common/utils/functions.utils';

export class CustomStickerLineDto {
  @ApiProperty({})
  @IsString()
  text: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @Min(1)
  ratio: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @Min(1)
  lineNumber: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @Min(10)
  @Max(60)
  width: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(({ value }) => transformToNumber(value))
  @Min(3)
  @Max(20)
  height: number;
}
