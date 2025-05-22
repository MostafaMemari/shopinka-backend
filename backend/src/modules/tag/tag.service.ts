import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';
import { CacheService } from '../cache/cache.service';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { Prisma, Tag } from '@prisma/client';
import { TagMessages } from './enums/tag-messages.enum';
import { QueryTagDto } from './dto/query-tag.dto';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { pagination } from '../../common/utils/pagination.utils';
import slugify from 'slugify';

@Injectable()
export class TagService {
  private readonly CACHE_EXPIRE_TIME: number = 600; //* 5 minutes

  constructor(
    private readonly tagRepository: TagRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async create(userId: number, createTagDto: CreateTagDto): Promise<{ message: string; tag: Tag }> {
    const { name, thumbnailImageId, slug } = createTagDto;

    if (thumbnailImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } });

    const uniqueSlug = slug ?? (await this.generateUniqueSlug(name));

    const newTag = await this.tagRepository.create({ data: { ...createTagDto, userId, slug: uniqueSlug } });

    return { message: TagMessages.CreatedTagSuccess, tag: newTag };
  }

  async findAll({ take, page, ...queryTagDto }: QueryTagDto): Promise<unknown> {
    const paginationDto = { take, page };
    const { endDate, sortBy, sortDirection, startDate, includeUser, includeBlogs, includeProducts, includeThumbnailImage, name } =
      queryTagDto;

    const sortedDto = sortObject(queryTagDto);

    const cacheKey = `${CacheKeys.Tags}_${JSON.stringify(sortedDto)}`;

    const cachedTags = await this.cacheService.get<null | Tag[]>(cacheKey);

    if (cachedTags) return { ...pagination(paginationDto, cachedTags) };

    const filters: Prisma.TagWhereInput = {};

    if (name) filters.name = { contains: name, mode: 'insensitive' };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const tags = await this.tagRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: {
        blogs: includeBlogs,
        products: includeProducts,
        thumbnailImage: includeThumbnailImage,
        user: includeUser && { select: { id: true, fullName: true } },
      },
    });

    await this.cacheService.set(cacheKey, tags, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, tags) };
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOneOrThrow({
      where: { id },
      include: { blogs: true, products: true, thumbnailImage: true, user: { select: { id: true, fullName: true } }, seoMeta: true },
    });
  }

  async update(userId: number, tagId: number, updateTagDto: UpdateTagDto): Promise<{ message: string; tag: Tag }> {
    const { slug, thumbnailImageId } = updateTagDto;

    await this.tagRepository.findOneOrThrow({ where: { id: tagId, userId } });

    if (slug) {
      const existingTag = await this.tagRepository.findOne({ where: { slug } });
      if (existingTag) throw new ConflictException(TagMessages.AlreadyExistsTag);
    }

    if (thumbnailImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } });

    const updatedTag = await this.tagRepository.update({ where: { id: tagId }, data: updateTagDto });

    return { message: TagMessages.UpdatedTagSuccess, tag: updatedTag };
  }

  async remove(userId: number, tagId: number): Promise<{ message: string; tag: Tag }> {
    await this.tagRepository.findOneOrThrow({ where: { id: tagId, userId } });

    const removedTag = await this.tagRepository.delete({ where: { id: tagId } });

    return { message: TagMessages.RemovedTagSuccess, tag: removedTag };
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true });
    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.tagRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }
}
