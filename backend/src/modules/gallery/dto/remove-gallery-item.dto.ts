import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ArrayUnique, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { transformNumberArray } from '../../../common/utils/functions.utils';

export class RemoveGalleryItemDto {
  @ApiProperty({
    isArray: true,
    type: 'array',
    uniqueItems: true,
    items: { type: 'number', nullable: false },
  })
  @Transform(({ value }) => transformNumberArray(value))
  @IsArray()
  @ArrayUnique()
  @IsNotEmpty()
  galleryItemIds: number[];

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiProperty({
    type: 'boolean',
    nullable: true,
    required: false,
  })
  isForce?: boolean;
}
