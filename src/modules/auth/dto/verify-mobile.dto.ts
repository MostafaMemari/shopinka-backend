import { OmitType } from '@nestjs/swagger';
import { VerifyOtpDto } from './verifyOtp.dto';

export class VerifyMobileDto extends OmitType(VerifyOtpDto, ['mobile']) {}
