import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { BackupService } from '../backup/backup.service';

@Injectable()
export class CronService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly backupService: BackupService,
  ) {}

  // @Cron(CronExpression.EVERY_12_HOURS)
  // async handleCreateBackup() {
  //   await this.backupService.create();
  // }
}
