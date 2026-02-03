import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, SeoRedirect } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { SeoRedirectMessages } from './enums/seo-redirect-messages.enum';

@Injectable()
export class SeoRedirectRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.SeoRedirectCreateArgs): Promise<SeoRedirect> {
    return this.prismaService.seoRedirect.create(args);
  }

  findOne(args: Prisma.SeoRedirectFindFirstArgs): Promise<SeoRedirect | null> {
    return this.prismaService.seoRedirect.findFirst(args);
  }

  findAll(args: Prisma.SeoRedirectFindManyArgs): Promise<SeoRedirect[]> {
    return this.prismaService.seoRedirect.findMany(args);
  }

  update(args: Prisma.SeoRedirectUpdateArgs): Promise<SeoRedirect> {
    return this.prismaService.seoRedirect.update(args);
  }

  delete(args: Prisma.SeoRedirectDeleteArgs): Promise<SeoRedirect> {
    return this.prismaService.seoRedirect.delete(args);
  }

  async findOneOrThrow(args: Prisma.SeoRedirectFindFirstArgs): Promise<SeoRedirect> {
    const redirect = await this.findOne(args);
    if (!redirect) throw new NotFoundException(SeoRedirectMessages.NotFoundRedirect);
    return redirect;
  }

  aggregate(args: Prisma.SeoRedirectAggregateArgs) {
    return this.prismaService.seoRedirect.aggregate(args);
  }
}
