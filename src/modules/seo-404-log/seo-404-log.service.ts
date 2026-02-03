import { Injectable } from '@nestjs/common';
import { Prisma, Seo404Log } from '@prisma/client';

import { Seo404LogRepository } from './seo-404-log.repository';
import { Seo404LogMessages } from './enums/seo-404-log-messages.enum';
import { Seo404LogFilterDto } from './dto/seo-404-log-filter.dto';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';
import { CreateSeoRedirectDto } from '../seo-redirect/dto/create-seo-redirect.dto';
import { SeoRedirectRepository } from '../seo-redirect/redirect-seo.repository';

@Injectable()
export class Seo404LogService {
  constructor(
    private readonly seo404LogRepository: Seo404LogRepository,
    private readonly seoRedirectRepository: SeoRedirectRepository,
  ) {}

  async registerHit(path: string, referrer?: string, userAgent?: string) {
    const existingSeo404Log = await this.seo404LogRepository.findOne({ where: { path } });

    if (!existingSeo404Log) {
      return this.seo404LogRepository.create({ data: { path, referrer: referrer || null, userAgent: userAgent || null } });
    }

    return this.seo404LogRepository.update({
      where: { id: existingSeo404Log.id },
      data: { hitCount: { increment: 1 }, lastSeenAt: new Date() },
    });
  }

  async findAll({ page, take, ...filterDto }: Seo404LogFilterDto): Promise<OutputPagination<Seo404Log>> {
    const paginationDto = { page, take };
    const { hitCount, path, referrer, userAgent } = filterDto;

    const where: Prisma.Seo404LogWhereInput = {};

    if (hitCount) where.hitCount = hitCount;
    if (path) where.path = { contains: path };
    if (referrer) where.referrer = { contains: referrer };
    if (userAgent) where.userAgent = { contains: userAgent };

    const seo404logs = await this.seo404LogRepository.findAll({ where, orderBy: { lastSeenAt: 'desc' }, take, skip: (page - 1) * take });

    return pagination(paginationDto, seo404logs);
  }

  findOne(id: number): Promise<Seo404Log> {
    return this.seo404LogRepository.findOneOrThrow({ where: { id } });
  }

  async popularLinks(take = 5): Promise<{ path: string; title?: string | null; hitCount: number }[]> {
    const links = await this.seo404LogRepository.findAll({
      orderBy: { hitCount: 'desc' },
      take,
    });
    return links.map((link) => ({
      path: link.path,
      title: null,
      hitCount: link.hitCount,
    }));
  }

  async remove(id: number): Promise<{ message: string; seo404Log: Seo404Log }> {
    await this.seo404LogRepository.findOneOrThrow({ where: { id } });

    const removedSeo404Log = await this.seo404LogRepository.delete({ where: { id } });

    return { message: Seo404LogMessages.RemovedSeo404LogSuccess, seo404Log: removedSeo404Log };
  }

  async createRedirectFromLog(id: number, dto: CreateSeoRedirectDto) {
    const log = await this.seo404LogRepository.findOneOrThrow({ where: { id } });
    const fromPath = log.path;
    await this.seoRedirectRepository.create({ data: { ...dto, fromPath } });
    return { message: Seo404LogMessages.RegisteredRedirect, fromPath, toPath: dto.toPath };
  }
}
