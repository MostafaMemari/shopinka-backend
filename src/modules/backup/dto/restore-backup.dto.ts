import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RestoreBackupDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  key: string;
}
