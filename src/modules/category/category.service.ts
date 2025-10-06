import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { Category, Prisma } from '@prisma/client';
import { QueryCategoryDto } from './dto/query-category.dto';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { pagination } from '../../common/utils/pagination.utils';
import { CategoryMessages } from './enums/category-messages.enum';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) {}

  async create(userId: number, createCategoryDto: CreateCategoryDto): Promise<{ message: string; category: Category }> {
    const { slug, parentId, thumbnailImageId, name } = createCategoryDto;
    if (createCategoryDto.parentId) await this.categoryRepository.findOneOrThrow({ where: { id: parentId } });

    if (slug) {
      const existingCategory = await this.categoryRepository.findOne({ where: { slug } });
      if (existingCategory) throw new ConflictException(CategoryMessages.AlreadyExistsCategory);
    }

    if (thumbnailImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } });

    const uniqueSlug = slug ?? (await this.generateUniqueSlug(name));

    const newCategory = await this.categoryRepository.create({
      data: { ...createCategoryDto, userId, slug: uniqueSlug },
      include: { thumbnailImage: true, parent: true },
    });

    return { message: CategoryMessages.CreatedCategorySuccess, category: newCategory };
  }

  async findAll({ page, take, ...queryCategoryDto }: QueryCategoryDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      description,
      endDate,
      includeUser,
      slug,
      name,
      sortBy,
      sortDirection,
      startDate,
      includeChildren,
      includeParent,
      includeThumbnailImage,
      childrenDepth,
      includeBlogs,
      includeProducts,
      includeSeoMeta,
      type,
      includeOnlyTopLevel,
    } = queryCategoryDto;

    const filters: Prisma.CategoryWhereInput = {};

    if (type) filters.type = type;
    if (description) filters.description = { contains: description };
    if (slug) filters.slug = { contains: slug };
    if (name) filters.name = { contains: name };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }
    if (includeOnlyTopLevel === true) {
      filters.parent = null;
    }

    const include: Prisma.CategoryInclude = {
      user: includeUser && { select: { id: true, fullName: true } },
      parent: includeParent,
      thumbnailImage: includeThumbnailImage,
      blogs: includeBlogs,
      children: includeChildren,
      products: includeProducts,
      seoMeta: includeSeoMeta,
    };

    const categories = await this.categoryRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include,
    });

    let resultCategories = categories;
    if (includeChildren && childrenDepth > 0) {
      resultCategories = await Promise.all(
        categories.map(async (category) => await this.loadChildren(category.id, include, childrenDepth)),
      );
    }

    return { ...pagination(paginationDto, resultCategories) };
  }

  findOne(id: number): Promise<Category | never> {
    return this.loadChildren(
      id,
      {
        children: true,
        user: { select: { id: true, fullName: true } },
        blogs: true,
        parent: true,
        thumbnailImage: true,
        products: true,
        seoMeta: true,
      },
      Infinity,
    );
  }

  async findOneBySlug(slug: string): Promise<Category | never> {
    return await this.categoryRepository.findOneOrThrow({
      where: { slug },
      include: {
        children: {
          select: { id: true, name: true, slug: true, thumbnailImage: { select: { id: true, fileUrl: true } } },
        },
        thumbnailImage: { select: { id: true, fileUrl: true } },
      },
    });
  }

  async update(userId: number, categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<{ message: string; category: Category }> {
    const { parentId, slug, thumbnailImageId } = updateCategoryDto;

    const category = await this.categoryRepository.findOneOrThrow({ where: { id: categoryId, userId }, include: { children: true } });

    if (category.id === parentId) throw new BadRequestException(CategoryMessages.CannotSetItselfAsParent);

    if (await this.isParentIdInChildren(categoryId, parentId)) throw new BadRequestException(CategoryMessages.ParentIsChild);

    if (slug) {
      const existingCategory = await this.categoryRepository.findOne({ where: { slug, id: { not: categoryId } } });
      if (existingCategory) throw new ConflictException(CategoryMessages.AlreadyExistsCategory);
    }

    if (parentId) await this.categoryRepository.findOneOrThrow({ where: { id: parentId } });

    if (thumbnailImageId !== null) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } });

    const updatedCategory = await this.categoryRepository.update({
      where: { id: categoryId },
      data: updateCategoryDto,
      include: { children: true, parent: true, thumbnailImage: true },
    });

    return { message: CategoryMessages.UpdatedCategorySuccess, category: updatedCategory };
  }

  async remove(userId: number, categoryId: number): Promise<{ message: string; category: Category }> {
    await this.categoryRepository.findOneOrThrow({ where: { id: categoryId, userId }, include: { children: true } });

    const removedCategory = await this.categoryRepository.delete({
      where: { id: categoryId },
      include: { children: true, parent: true, thumbnailImage: true },
    });

    return { message: CategoryMessages.RemovedCategorySuccess, category: removedCategory };
  }

  private async isParentIdInChildren(categoryId: number, parentId: number) {
    const queue = [categoryId];

    while (queue.length > 0) {
      const currentId = queue.shift();

      const children = await this.categoryRepository.findAll({ where: { parentId: currentId }, select: { id: true } });

      for (const child of children) {
        if (child.id == parentId) return true;
        queue.push(child.id);
      }
    }

    return false;
  }

  private async loadChildren(categoryId: number, include: Prisma.CategoryInclude, depth: number): Promise<Category> {
    if (depth <= 0) this.categoryRepository.findOneOrThrow({ where: { id: categoryId }, include });

    const category = await this.categoryRepository.findOneOrThrow({
      where: { id: categoryId },
      include: {
        ...include,
        children: true,
      },
    });

    if (category['children'] && category['children'].length > 0) {
      category['children'] = await Promise.all(category['children'].map((child) => this.loadChildren(child.id, include, depth - 1)));
    }

    return category;
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, strict: true, trim: true });
    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.categoryRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }
}
