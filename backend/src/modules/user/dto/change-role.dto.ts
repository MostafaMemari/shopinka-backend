import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Role } from 'generated/prisma';

export class ChangeRoleDto {
  @IsEnum(Role)
  @ApiProperty({
    type: 'string',
    enum: Role,
    nullable: false,
    required: true,
  })
  role: Role;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => +value)
  @ApiProperty({
    type: 'number',
    required: true,
    nullable: false,
  })
  userId: number;
}
