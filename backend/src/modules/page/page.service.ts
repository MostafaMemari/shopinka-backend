import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { CacheService } from '../cache/cache.service';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { Prisma, Page } from '@prisma/client';
import { PageMessages } from './enums/page-messages.enum';
import { QueryPageDto } from './dto/query-page.dto';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { pagination } from '../../common/utils/pagination.utils';
import slugify from 'slugify';
import { PageRepository } from './page.repository';

@Injectable()
export class PageService {
  private readonly CACHE_EXPIRE_TIME: number = 600; //* 5 minutes

  constructor(
    private readonly pageRepository: PageRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async create(userId: number, createPageDto: CreatePageDto): Promise<{ message: string; page: Page }> {
    const { name, slug } = createPageDto;

    const uniqueSlug = slug ?? (await this.generateUniqueSlug(name));

    const newPage = await this.pageRepository.create({ data: { ...createPageDto, userId, slug: uniqueSlug } });

    return { message: PageMessages.CreatedPageSuccess, page: newPage };
  }

  async findAll({ take, page, ...queryPageDto }: QueryPageDto): Promise<unknown> {
    const paginationDto = { take, page };
    const { name } = queryPageDto;

    const sortedDto = sortObject(queryPageDto);

    const cacheKey = `${CacheKeys.Pages}_${JSON.stringify(sortedDto)}`;

    const cachedPages = await this.cacheService.get<null | Page[]>(cacheKey);

    if (cachedPages) return { ...pagination(paginationDto, cachedPages) };

    const filters: Prisma.PageWhereInput = {};

    if (name) filters.name = { contains: name, mode: 'insensitive' };

    const pages = await this.pageRepository.findAll({
      where: filters,
    });

    await this.cacheService.set(cacheKey, pages, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, pages) };
  }

  findOne(id: number): Promise<Page> {
    return this.pageRepository.findOneOrThrow({
      where: { id },
    });
  }

  async update(userId: number, pageId: number, updatePageDto: UpdatePageDto): Promise<{ message: string; page: Page }> {
    const { slug } = updatePageDto;

    await this.pageRepository.findOneOrThrow({ where: { id: pageId, userId } });

    if (slug) {
      const existingPage = await this.pageRepository.findOne({ where: { slug } });
      if (existingPage) throw new ConflictException(PageMessages.AlreadyExistsPage);
    }

    const updatedPage = await this.pageRepository.update({ where: { id: pageId }, data: updatePageDto });

    return { message: PageMessages.UpdatedPageSuccess, page: updatedPage };
  }

  async remove(userId: number, pageId: number): Promise<{ message: string; page: Page }> {
    await this.pageRepository.findOneOrThrow({ where: { id: pageId, userId } });

    const removedPage = await this.pageRepository.delete({ where: { id: pageId } });

    return { message: PageMessages.RemovedPageSuccess, page: removedPage };
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true });
    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.pageRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }
}
