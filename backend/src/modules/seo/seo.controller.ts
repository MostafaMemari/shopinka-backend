import { Body, Controller, Put } from '@nestjs/common';
import { SeoService } from './seo.service';
import { Role, User } from 'generated/prisma';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SeoMetaDto } from './dto/seo-meta.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { Roles } from '../../common/decorators/role.decorator';

@Controller('seo')
@ApiTags('seo')
@AuthDecorator()
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Put()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  upsertSeo(@Body() seoMetaDto: SeoMetaDto, @GetUser() user: User) {
    return this.seoService.upsertSeoMeta(user.id, seoMetaDto);
  }
}
