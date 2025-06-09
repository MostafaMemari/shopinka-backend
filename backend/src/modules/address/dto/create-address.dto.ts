import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  province: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  streetAndAlley: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  plate: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  unit?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'Postal code must be exactly 10 digits' })
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: false,
    nullable: true,
  })
  postalCode?: string;
}
