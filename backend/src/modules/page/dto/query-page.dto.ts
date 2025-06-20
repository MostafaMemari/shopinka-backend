import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dtos/pagination.dto';

export class QueryPageDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: 'string',
    nullable: true,
    required: false,
  })
  name?: string;
}
