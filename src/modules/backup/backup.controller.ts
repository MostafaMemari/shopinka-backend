import { Controller, Post, Body } from '@nestjs/common';
import { BackupService } from './backup.service';
import { RestoreBackupDto } from './dto/restore-backup.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role } from '@prisma/client';

@Controller('backup')
@ApiTags('backup')
@AuthDecorator()
export class BackupController {
  constructor(private readonly backupService: BackupService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create() {
    return this.backupService.create();
  }

  @Post('restore')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  restore(@Body() restoreBackupDto: RestoreBackupDto) {
    return this.backupService.restore(restoreBackupDto);
  }
}
