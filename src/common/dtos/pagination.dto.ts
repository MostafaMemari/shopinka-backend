import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  @ApiPropertyOptional({
    type: 'number',
    nullable: false,
    required: false,
  })
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => +value)
  @ApiPropertyOptional({
    type: 'number',
    nullable: false,
    required: false,
  })
  take: number = 20;
}
