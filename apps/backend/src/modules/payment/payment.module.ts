import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService , AuthService, UserRepository , PaymentRepository],
})
export class PaymentModule {}
