import { Module } from '@nestjs/common';
import { Seo404LogService } from './seo-404-log.service';
import { Seo404LogController } from './seo-404-log.controller';
import { AuthModule } from '../auth/auth.module';
import { Seo404LogRepository } from './seo-404-log.repository';
import { SeoRedirectRepository } from '../seo-redirect/redirect-seo.repository';

@Module({
  imports: [AuthModule],
  controllers: [Seo404LogController],
  providers: [Seo404LogService, Seo404LogRepository, SeoRedirectRepository],
  exports: [Seo404LogService],
})
export class Seo404LogModule {}
