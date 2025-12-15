import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsInt, IsNumber, IsOptional, Min, ValidateNested } from 'class-validator';
import { transformToNumber } from 'src/common/utils/functions.utils';

export class StickerLineDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 0 })
  lineNumber: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 30 })
  width: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ example: 4.1 })
  height: number;
}

export class CalculateStickerPriceDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: 'number', required: false })
  fontId?: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({ type: 'number' })
  materialId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StickerLineDto)
  @ApiProperty({
    type: [StickerLineDto],
    example: [
      {
        lineNumber: 0,
        width: 30,
        height: 4.1,
      },
    ],
  })
  lines: StickerLineDto[];
}
