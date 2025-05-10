import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { Category, Prisma } from 'generated/prisma';
import { QueryCategoryDto } from './dto/query-category.dto';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { CacheService } from '../cache/cache.service';
import { pagination } from '../../common/utils/pagination.utils';
import { CategoryMessages } from './enums/category-messages.enum';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly cacheService: CacheService
  ) { }

  async create(userId: number, createCategoryDto: CreateCategoryDto): Promise<{ message: string, category: Category }> {
    const { slug, parentId, thumbnailImageId, name } = createCategoryDto
    if (createCategoryDto.parentId) await this.categoryRepository.findOneOrThrow({ where: { id: parentId } })

    const existingCategory = await this.categoryRepository.findOne({ where: { slug } })

    if (existingCategory) throw new ConflictException(CategoryMessages.AlreadyExistsCategory)

    if (thumbnailImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } })

    const uniqueSlug = slug ?? await this.generateUniqueSlug(name)

    const newCategory = await this.categoryRepository.create({
      data: { ...createCategoryDto, userId, slug: uniqueSlug },
      include: { thumbnailImage: true, parent: true }
    })

    return { message: CategoryMessages.CreatedCategorySuccess, category: newCategory }
  }

  async findAll({ page, take, ...queryCategoryDto }: QueryCategoryDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { description, endDate, includeUser, slug, sortBy, sortDirection, startDate, includeChildren, includeParent, includeThumbnailImage } = queryCategoryDto

    const sortedDto = sortObject(queryCategoryDto);

    const cacheKey = `${CacheKeys.Categories}_${JSON.stringify(sortedDto)}`;

    const cachedCategories = await this.cacheService.get<null | Category[]>(cacheKey);

    if (cachedCategories) return { ...pagination(paginationDto, cachedCategories) }

    const filters: Prisma.CategoryWhereInput = {};

    if (description) filters.description = { contains: description, mode: "insensitive" };
    if (slug) filters.slug = { contains: slug, mode: "insensitive" };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const categories = await this.categoryRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { user: includeUser, children: includeChildren, parent: includeParent, thumbnailImage: includeThumbnailImage }
    });

    await this.cacheService.set(cacheKey, categories, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, categories) }
  }

  findOne(id: number): Promise<Category | never> {
    return this.getCategoryWithAllChildren(id)
  }

  async update(userId: number, categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<{ message: string, category: Category }> {
    const { parentId, slug, thumbnailImageId } = updateCategoryDto

    const category = await this.categoryRepository.findOneOrThrow({ where: { id: categoryId, userId }, include: { children: true } })

    if (category.id === parentId) throw new BadRequestException(CategoryMessages.CannotSetItselfAsParent)

    if (await this.isParentIdInChildren(categoryId, parentId))
      throw new BadRequestException(CategoryMessages.ParentIsChild)

    if (slug) {
      const existingCategory = await this.categoryRepository.findOne({ where: { slug, id: { not: categoryId } } })
      if (existingCategory) throw new ConflictException(CategoryMessages.AlreadyExistsCategory)
    }

    if (parentId) await this.categoryRepository.findOneOrThrow({ where: { id: parentId } })

    if (thumbnailImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } })

    const updatedCategory = await this.categoryRepository.update({
      where: { id: categoryId }, data: updateCategoryDto,
      include: { children: true, parent: true, thumbnailImage: true }
    })

    return { message: CategoryMessages.UpdatedCategorySuccess, category: updatedCategory }
  }

  async remove(userId: number, categoryId: number): Promise<{ message: string, category: Category }> {
    await this.categoryRepository.findOneOrThrow({ where: { id: categoryId, userId }, include: { children: true } })

    const removedCategory = await this.categoryRepository.delete({ where: { id: categoryId }, include: { children: true, parent: true, thumbnailImage: true } })

    return { message: CategoryMessages.RemovedCategorySuccess, category: removedCategory }
  }

  private async isParentIdInChildren(categoryId: number, parentId: number) {
    const queue = [categoryId]

    while (queue.length > 0) {
      const currentId = queue.shift()

      const children = await this.categoryRepository.findAll({ where: { parentId: currentId }, select: { id: true } })

      for (const child of children) {
        if (child.id == parentId) return true
        queue.push(child.id)
      }
    }

    return false
  }

  private async getCategoryWithAllChildren(categoryId: number): Promise<Category> {
    const category = await this.categoryRepository.findOneOrThrow({
      where: { id: categoryId },
      include: {
        parent: { select: { id: true, slug: true, description: true } },
        thumbnailImage: { select: { id: true, size: true, fileUrl: true } },
        children: true,
        user: { select: { id: true, fullName: true } }
      }
    })

    category['children'] = await Promise.all(
      category['children'].map(async child => this.getCategoryWithAllChildren(child.id))
    )

    return category
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true })
    let suffix = 0
    let uniqueSlug = slug

    while (await this.categoryRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++
      uniqueSlug = `${slug}-${suffix}`
    }

    return uniqueSlug
  }
}
