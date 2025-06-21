import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length } from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  @Transform(({ value }) => value?.trim())
  @ApiProperty({
    type: 'string',
    required: true,
    nullable: false,
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  @ApiProperty({
    type: 'string',
    nullable: false,
    required: true,
  })
  phone: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    nullable: false,
    required: false,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(5, 1000)
  @ApiProperty({
    type: 'string',
    nullable: false,
    required: true,
  })
  message: string;
}
