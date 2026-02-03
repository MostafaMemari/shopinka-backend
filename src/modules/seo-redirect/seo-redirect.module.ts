import { Module } from '@nestjs/common';
import { SeoRedirectService } from './seo-redirect.service';
import { SeoRedirectController } from './seo-redirect.controller';
import { SeoRedirectRepository } from './redirect-seo.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [SeoRedirectController],
  providers: [SeoRedirectService, SeoRedirectRepository],
  exports: [SeoRedirectService, SeoRedirectRepository],
})
export class SeoRedirectModule {}
