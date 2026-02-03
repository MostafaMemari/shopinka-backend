import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Seo404Log } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Seo404LogMessages } from './enums/seo-404-log-messages.enum';

@Injectable()
export class Seo404LogRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(args: Prisma.Seo404LogCreateArgs): Promise<Seo404Log> {
    return this.prisma.seo404Log.create(args);
  }

  findOne(args: Prisma.Seo404LogFindFirstArgs): Promise<Seo404Log | null> {
    return this.prisma.seo404Log.findFirst(args);
  }

  findAll(args: Prisma.Seo404LogFindManyArgs): Promise<Seo404Log[]> {
    return this.prisma.seo404Log.findMany(args);
  }

  update(args: Prisma.Seo404LogUpdateArgs): Promise<Seo404Log> {
    return this.prisma.seo404Log.update(args);
  }

  delete(args: Prisma.Seo404LogDeleteArgs): Promise<Seo404Log> {
    return this.prisma.seo404Log.delete(args);
  }

  async findOneOrThrow(args: Prisma.Seo404LogFindFirstArgs): Promise<Seo404Log> {
    const log = await this.findOne(args);
    if (!log) throw new NotFoundException(Seo404LogMessages.NotFoundSeo404Log);
    return log;
  }
}
