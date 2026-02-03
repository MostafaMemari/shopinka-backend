import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { transformToNumber } from '../../../common/utils/functions.utils';

export class CreateSeoRedirectDto {
  @IsString()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  fromPath: string;

  @IsString()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  toPath: string;

  @IsInt()
  @Min(301)
  @Max(410)
  @Transform(({ value }) => transformToNumber(value))
  @ApiProperty({ type: 'number', required: true, nullable: false })
  statusCode: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  note?: string;
}
