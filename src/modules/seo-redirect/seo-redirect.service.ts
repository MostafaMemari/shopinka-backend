import { ConflictException, Injectable } from '@nestjs/common';
import { SeoRedirect } from '@prisma/client';

import { CreateSeoRedirectDto } from './dto/create-seo-redirect.dto';
import { UpdateSeoRedirectDto } from './dto/update-seo-redirect.dto';
import { SeoRedirectRepository } from './redirect-seo.repository';
import { SeoRedirectMessages } from './enums/seo-redirect-messages.enum';

import { PaginationDto } from '../../common/dtos/pagination.dto';
import { OutputPagination, pagination } from '../../common/utils/pagination.utils';

@Injectable()
export class SeoRedirectService {
  constructor(private readonly seoRedirectRepository: SeoRedirectRepository) {}

  async create(createSeoRedirectDto: CreateSeoRedirectDto): Promise<{ message: string; seoRedirect: SeoRedirect }> {
    const existingSeoRedirect = await this.seoRedirectRepository.findOne({ where: { fromPath: createSeoRedirectDto.fromPath } });

    if (existingSeoRedirect) throw new ConflictException(SeoRedirectMessages.AlreadyExistsSeoRedirect);

    const newSeoRedirect = await this.seoRedirectRepository.create({ data: { ...createSeoRedirectDto } });

    return { message: SeoRedirectMessages.CreatedSeoRedirectSuccess, seoRedirect: newSeoRedirect };
  }

  async findAll(paginationDto: PaginationDto): Promise<OutputPagination<SeoRedirect>> {
    const seoRedirects = await this.seoRedirectRepository.findAll({ orderBy: { id: 'desc' } });

    return pagination(paginationDto, seoRedirects);
  }

  findOne(id: number): Promise<SeoRedirect> {
    return this.seoRedirectRepository.findOneOrThrow({ where: { id } });
  }

  async update(id: number, updateSeoRedirectDto: UpdateSeoRedirectDto): Promise<{ message: string; seoRedirect: SeoRedirect }> {
    const { fromPath } = updateSeoRedirectDto;

    await this.seoRedirectRepository.findOneOrThrow({ where: { id } });

    if (fromPath) {
      const existingSeoRedirect = await this.seoRedirectRepository.findOne({ where: { fromPath, id: { not: id } } });

      if (existingSeoRedirect) throw new ConflictException(SeoRedirectMessages.AlreadyExistsSeoRedirect);
    }

    const updatedSeoRedirect = await this.seoRedirectRepository.update({ where: { id }, data: { ...updateSeoRedirectDto } });

    return { message: SeoRedirectMessages.UpdatedSeoRedirectSuccess, seoRedirect: updatedSeoRedirect };
  }

  async remove(id: number): Promise<{ message: string; seoRedirect: SeoRedirect }> {
    await this.seoRedirectRepository.findOneOrThrow({ where: { id } });

    const removedSeoRedirect = await this.seoRedirectRepository.delete({ where: { id } });

    return { message: SeoRedirectMessages.RemovedSeoRedirectSuccess, seoRedirect: removedSeoRedirect };
  }

  async incrementHit(id: number): Promise<SeoRedirect> {
    await this.seoRedirectRepository.findOneOrThrow({ where: { id } });

    return this.seoRedirectRepository.update({ where: { id }, data: { hitCount: { increment: 1 }, lastHitAt: new Date() } });
  }

  async stats() {
    const totalHits = await this.seoRedirectRepository.aggregate({
      _sum: { hitCount: true },
      _count: { _all: true },
    });
    return { totalHitCount: totalHits._sum.hitCount || 0, totalRedirects: totalHits._count?.['_all'] || 0 };
  }
}
