import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { PaymentRepository } from './payment.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheService } from '../cache/cache.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [PaymentController],
  providers: [PaymentService , AuthService, UserRepository , PaymentRepository , CacheService],
})
export class PaymentModule {}
