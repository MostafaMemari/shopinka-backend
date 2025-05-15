import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './blog.repository';
import { Blog, BlogStatus, Prisma } from 'generated/prisma';
import { BlogMessages } from './enums/blog-messages.enum';
import { CategoryRepository } from '../category/category.repository';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { QueryBlogDto } from './dto/query-blog.dto';
import { CacheService } from '../cache/cache.service';
import { estimateReadingTime, sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { TagRepository } from '../tag/tag.repository';
import slugify from 'slugify';

@Injectable()
export class BlogService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagRepository,
    private readonly cacheService: CacheService,
  ) { }

  async create(userId: number, createBlogDto: CreateBlogDto): Promise<{ message: string, blog: Blog }> {
    const { title, categoryIds, slug, tagIds, content, readingTime } = createBlogDto

    if (slug) {
      const existingBlog = await this.blogRepository.findOne({ where: { slug } })
      if (existingBlog) throw new ConflictException(BlogMessages.AlreadyExistsBlog)
    }

    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : []
    const tags = tagIds ? await this.tagRepository.findAll({ where: { id: { in: tagIds } } }) : []

    const uniqueSlug = slug ?? await this.generateUniqueSlug(title)

    categoryIds && delete createBlogDto.categoryIds
    tagIds && delete createBlogDto.tagIds

    const newBlog = await this.blogRepository.create({
      data: {
        ...createBlogDto,
        userId,
        slug: uniqueSlug,
        categories: { connect: categories.map(c => ({ id: c.id })) },
        tags: { connect: tags.map(t => ({ id: t.id })) },
        readingTime: readingTime ?? estimateReadingTime(content)
      }
    })

    return { message: BlogMessages.CreatedBlogSuccess, blog: newBlog }
  }

  async findAll({ take, page, ...queryBlogDto }: QueryBlogDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { endDate, sortBy, sortDirection, startDate, includeCategories, includeSeoMeta, includeTags, includeUser, title, } = queryBlogDto;

    const sortedDto = sortObject(queryBlogDto);

    const cacheKey = `${CacheKeys.Blogs}_${JSON.stringify(sortedDto)}`;

    const cachedBlogs = await this.cacheService.get<null | Blog[]>(cacheKey);

    if (cachedBlogs) return { ...pagination(paginationDto, cachedBlogs) }

    const filters: Prisma.BlogWhereInput = { status: BlogStatus.PUBLISHED };

    if (title) filters.title = { contains: title, mode: "insensitive" };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const blogs = await this.blogRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { categories: includeCategories, seoMeta: includeSeoMeta, tags: includeTags, user: includeUser && { select: { id: true, fullName: true } } }
    });

    await this.cacheService.set(cacheKey, blogs, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, blogs) }
  }

  async findAllDrafts(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const blogs = await this.blogRepository.findAll({
      where: { userId, status: BlogStatus.DRAFT },
      include: { categories: true, seoMeta: true, tags: true }
    })

    return pagination(paginationDto, blogs)
  }

  findOne(id: number): Promise<Blog> {
    return this.blogRepository.findOneOrThrow({
      where: { id, status: BlogStatus.PUBLISHED },
      include: { categories: true, seoMeta: true, tags: true, user: { select: { id: true, fullName: true } } }
    })
  }

  async update(userId: number, blogId: number, updateBlogDto: UpdateBlogDto): Promise<{ message: string, blog: Blog }> {
    const { categoryIds, tagIds, slug, content, readingTime } = updateBlogDto
    await this.blogRepository.findOneOrThrow({ where: { id: blogId, userId } })

    if (slug) {
      const existingBlog = await this.blogRepository.findOne({ where: { slug } })
      if (existingBlog) throw new ConflictException(BlogMessages.AlreadyExistsBlog)
    }

    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : undefined
    const tags = tagIds ? await this.tagRepository.findAll({ where: { id: { in: tagIds } } }) : undefined

    categoryIds && delete updateBlogDto.categoryIds
    tagIds && delete updateBlogDto.tagIds

    const updatedBlog = await this.blogRepository.update({
      where: { id: blogId },
      data: {
        ...updateBlogDto,
        userId,
        categories: categories ? { connect: categories.map(c => ({ id: c.id })) } : undefined,
        tags: tagIds ? { connect: tags.map(t => ({ id: t.id })) } : undefined,
        readingTime: content && !readingTime ? estimateReadingTime(content) : readingTime
      }
    })

    return { message: BlogMessages.UpdatedBlogSuccess, blog: updatedBlog }
  }

  async remove(userId: number, blogId: number): Promise<{ message: string, blog: Blog }> {
    await this.blogRepository.findOneOrThrow({ where: { id: blogId, userId } })

    const removedBlog = await this.blogRepository.delete({ where: { id: blogId } })

    return { message: BlogMessages.RemovedBlogSuccess, blog: removedBlog }
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true })
    let suffix = 0
    let uniqueSlug = slug

    while (await this.blogRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++
      uniqueSlug = `${slug}-${suffix}`
    }

    return uniqueSlug
  }
}
