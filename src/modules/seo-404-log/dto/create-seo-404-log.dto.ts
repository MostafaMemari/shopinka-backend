import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateSeo404LogDto {
  @ApiProperty({ type: 'string', required: true })
  @IsString()
  path: string;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString()
  referrer?: string;

  @ApiProperty({ type: 'string', required: false, nullable: true })
  @IsOptional()
  @IsString()
  userAgent?: string;
}
