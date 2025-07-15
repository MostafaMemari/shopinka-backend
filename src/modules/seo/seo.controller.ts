import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { SeoService } from './seo.service';
import { Role, User } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SeoMetaDto } from './dto/seo-meta.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { Roles } from '../../common/decorators/role.decorator';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { QuerySeoMetaDto } from './dto/query-seo-meta.dto';

@Controller('seo')
@ApiTags('seo')
@AuthDecorator()
export class SeoController {
  constructor(private readonly seoMetaService: SeoService) {}

  @Get()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  @SkipAuth()
  getSeo(@Query() querySeoMetaDto: QuerySeoMetaDto) {
    return this.seoMetaService.getSeo(querySeoMetaDto);
  }

  @Put()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  upsertSeo(@Body() seoMetaDto: SeoMetaDto, @GetUser() user: User) {
    return this.seoMetaService.upsertSeoMeta(user.id, seoMetaDto);
  }
}
