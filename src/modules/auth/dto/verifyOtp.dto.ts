import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('IR')
  @ApiProperty({
    type: 'string',
    nullable: false,
    required: true,
  })
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    nullable: false,
    required: true,
  })
  otp: string;
}
