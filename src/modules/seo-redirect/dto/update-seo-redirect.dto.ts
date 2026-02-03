import { PartialType } from '@nestjs/swagger';
import { CreateSeoRedirectDto } from './create-seo-redirect.dto';

export class UpdateSeoRedirectDto extends PartialType(CreateSeoRedirectDto) {}
