import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

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

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value == 'string') return value == 'true';
    return value;
  })
  @ApiPropertyOptional({ type: 'boolean', nullable: true, required: false })
  isDefault?: boolean;

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
  postalAddress: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    required: true,
    nullable: false,
  })
  buildingNumber: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    type: 'number',
    required: false,
    nullable: true,
  })
  unit?: number;

  @IsString()
  @IsNotEmpty({ message: 'کدپستی الزامی است' })
  @Matches(/^\d{10}$/, { message: 'کدپستی باید دقیقا ۱۰ رقم باشد' })
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
    example: '1234567890',
  })
  postalCode: string;
}
