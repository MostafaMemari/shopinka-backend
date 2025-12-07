import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class ReorderMaterialStickerDto {
  @ApiProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(1)
  id: number;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  displayOrder: number;
}
