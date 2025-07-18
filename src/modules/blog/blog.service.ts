import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './blog.repository';
import { Blog, BlogStatus, Prisma } from '@prisma/client';
import { BlogMessages } from './enums/blog-messages.enum';
import { CategoryRepository } from '../category/category.repository';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { QueryBlogDto } from './dto/query-blog.dto';
import { estimateReadingTime, sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { TagRepository } from '../tag/tag.repository';
import slugify from 'slugify';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async create(userId: number, createBlogDto: CreateBlogDto): Promise<{ message: string; blog: Blog }> {
    const { title, categoryIds, slug, tagIds, content, readingTime, mainImageId } = createBlogDto;

    if (slug) {
      const existingBlog = await this.blogRepository.findOne({ where: { slug } });
      if (existingBlog) throw new ConflictException(BlogMessages.AlreadyExistsBlog);
    }

    if (mainImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });

    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : [];
    const tags = tagIds ? await this.tagRepository.findAll({ where: { id: { in: tagIds } } }) : [];

    const uniqueSlug = slug ?? (await this.generateUniqueSlug(title));

    categoryIds && delete createBlogDto.categoryIds;
    tagIds && delete createBlogDto.tagIds;

    const newBlog = await this.blogRepository.create({
      data: {
        ...createBlogDto,
        userId,
        slug: uniqueSlug,
        categories: { connect: categories.map((c) => ({ id: c.id })) },
        tags: { connect: tags.map((t) => ({ id: t.id })) },
        readingTime: !readingTime && content ? estimateReadingTime(content) : readingTime,
      },
    });

    return { message: BlogMessages.CreatedBlogSuccess, blog: newBlog };
  }

  async findAll({ take, page, ...queryBlogDto }: QueryBlogDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      includeCategories,
      includeTags,
      includeUser,
      search,
      includeMainImage,
      categoryIds,
      tagIds,
    } = queryBlogDto;

    const sortedDto = sortObject(queryBlogDto);

    const cacheKey = `${CacheKeys.Blogs}_${JSON.stringify(sortedDto)}`;

    const filters: Prisma.BlogWhereInput = { status: BlogStatus.PUBLISHED };

    if (categoryIds) {
      filters.categories = { some: { id: { in: categoryIds } } };
    }

    if (tagIds) {
      filters.tags = { some: { id: { in: tagIds } } };
    }

    if (search) filters.title = { contains: search };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const blogs = await this.blogRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: {
        mainImage: includeMainImage,
        categories: includeCategories,
        tags: includeTags,
        user: includeUser && { select: { id: true, fullName: true } },
      },
    });

    return { ...pagination(paginationDto, blogs) };
  }

  async findAllDrafts(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const blogs = await this.blogRepository.findAll({
      where: { userId, status: BlogStatus.DRAFT },
      include: { mainImage: true, categories: true, tags: true },
    });

    return pagination(paginationDto, blogs);
  }

  findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOneOrThrow({
      where: { id, status: BlogStatus.PUBLISHED },
      include: { mainImage: true, categories: true, tags: true, user: { select: { id: true, fullName: true } }, seoMeta: true },
    });
  }

  findOneBySlug(slug: string): Promise<Blog> {
    return this.blogRepository.findOneOrThrow({
      where: { slug, status: BlogStatus.PUBLISHED },
      include: { mainImage: true, categories: true, tags: true, user: { select: { id: true, fullName: true } }, seoMeta: true },
    });
  }

  async update(userId: number, blogId: number, updateBlogDto: UpdateBlogDto): Promise<{ message: string; blog: Blog }> {
    const { categoryIds, tagIds, slug, content, readingTime, mainImageId } = updateBlogDto;
    await this.blogRepository.findOneOrThrow({ where: { id: blogId, userId } });

    if (slug) {
      const existingBlog = await this.blogRepository.findOne({ where: { slug } });
      if (existingBlog) throw new ConflictException(BlogMessages.AlreadyExistsBlog);
    }

    if (mainImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: mainImageId } });
    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : undefined;
    const tags = tagIds ? await this.tagRepository.findAll({ where: { id: { in: tagIds } } }) : undefined;

    categoryIds && delete updateBlogDto.categoryIds;
    tagIds && delete updateBlogDto.tagIds;

    const updatedBlog = await this.blogRepository.update({
      where: { id: blogId },
      data: {
        ...updateBlogDto,
        userId,
        categories: categories ? { connect: categories.map((c) => ({ id: c.id })) } : undefined,
        tags: tagIds ? { connect: tags.map((t) => ({ id: t.id })) } : undefined,
        readingTime: !readingTime && content ? estimateReadingTime(content) : readingTime,
      },
    });

    return { message: BlogMessages.UpdatedBlogSuccess, blog: updatedBlog };
  }

  async remove(userId: number, blogId: number): Promise<{ message: string; blog: Blog }> {
    await this.blogRepository.findOneOrThrow({ where: { id: blogId, userId } });

    const removedBlog = await this.blogRepository.delete({ where: { id: blogId } });

    return { message: BlogMessages.RemovedBlogSuccess, blog: removedBlog };
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true });
    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.blogRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }
}
