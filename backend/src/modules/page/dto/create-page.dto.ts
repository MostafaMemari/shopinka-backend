import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, nullable: false })
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(350)
  @ApiProperty({ type: 'string', required: false, nullable: true, maxLength: 350 })
  slug?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: false, nullable: true })
  description?: string;
}
