import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { AwsModule } from '../s3AWS/s3AWS.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AwsModule, UserModule, AuthModule],
  controllers: [BackupController],
  providers: [BackupService],
  exports: [BackupService, AwsModule],
})
export class BackupModule {}
