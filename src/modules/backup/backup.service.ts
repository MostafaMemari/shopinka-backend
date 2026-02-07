import { HttpException, Injectable } from '@nestjs/common';
import { parseDbUrl } from '../../common/utils/functions.utils';
import { AwsService } from '../s3AWS/s3AWS.service';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { RestoreBackupDto } from './dto/restore-backup.dto';
import { BackupMessages } from './enums/backup-messages.enum';

const execPromise = promisify(exec);

@Injectable()
export class BackupService {
  constructor(private readonly awsService: AwsService) {}

  async create(): Promise<{ message: string }> {
    let filePath: string | null = null;

    try {
      const { dbName, host, password, port } = parseDbUrl(process.env.DATABASE_URL);

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `backup-${timestamp}.sql`;
      filePath = path.join(process.cwd(), 'asserts/created-backups', fileName);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      const command = `mysqldump -u root -h ${host} -P ${port} ${dbName} > "${filePath}"`;

      await execPromise(command, {
        env: {
          ...process.env,
          MYSQL_PWD: password,
        },
      });

      const fileBuffer = fs.readFileSync(filePath);

      await this.awsService.uploadSingleFile({
        contentType: 'application/sql',
        isPublic: false,
        folderName: 'backups',
        fileMetadata: { file: fileBuffer, fileName },
      });

      fs.unlinkSync(filePath);

      return { message: BackupMessages.CreatedBackupSuccess };
    } catch (error: any) {
      if (filePath) fs.rmSync(filePath, { force: true });

      throw new HttpException(error.message || 'Backup failed', error.status || 500);
    }
  }

  async restore({ key }: RestoreBackupDto): Promise<{ message: string }> {
    await this.create();

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filePath = path.join(process.cwd(), 'asserts/restored-backups', `${timestamp}.sql`);

    try {
      const { dbName, host, password, port } = parseDbUrl(process.env.DATABASE_URL);

      const backupBuffer = await this.awsService.getFileBuffer(key);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      await fs.promises.writeFile(filePath, backupBuffer);

      const command = `mysql -u root -h ${host} -P ${port} ${dbName} < "${filePath}"`;

      await execPromise(command, {
        env: {
          ...process.env,
          MYSQL_PWD: password,
        },
      });

      fs.unlinkSync(filePath);

      return { message: BackupMessages.RestoredBackupSuccess };
    } catch (error: any) {
      fs.rmSync(filePath, { force: true });

      throw new HttpException(error.message || 'Restore failed', error.status || 500);
    }
  }
}
