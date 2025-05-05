import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryRepository } from './category.repository';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { Category } from 'generated/prisma';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly galleryItemRepository: GalleryItemRepository
  ) { }

  async create(userId: number, createCategoryDto: CreateCategoryDto): Promise<{ message: string, category: Category }> {
    const { slug, parentId, thumbnailImageId } = createCategoryDto
    if (createCategoryDto.parentId) await this.categoryRepository.findOneOrThrow({ where: { id: parentId } })

    const existingCategory = await this.categoryRepository.findOne({ where: { slug } })

    if (existingCategory) throw new ConflictException("Category with this slug already exists.")

    await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } })

    const newCategory = await this.categoryRepository.create({
      data: { ...createCategoryDto, userId },
      include: { thumbnailImage: true, parent: true }
    })

    return { message: "Created category successfully.", category: newCategory }
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number): Promise<Category | never> {
    return this.getCategoryWithAllChildren(id)
  }

  async update(userId: number, categoryId: number, updateCategoryDto: UpdateCategoryDto): Promise<{ message: string, category: Category }> {
    const { parentId, slug, thumbnailImageId } = updateCategoryDto

    const category = await this.categoryRepository.findOneOrThrow({ where: { id: categoryId, userId }, include: { children: true } })

    if (category.id === parentId) throw new BadRequestException()

    if (await this.isParentIdInChildren(categoryId, parentId))
      throw new BadRequestException("This parentId is child.")

    if (slug) {
      const existingCategory = await this.categoryRepository.findOne({ where: { slug, id: { not: categoryId } } })
      if (existingCategory) throw new ConflictException("Category with this slug already exists.")
    }

    if (parentId) await this.categoryRepository.findOneOrThrow({ where: { id: parentId } })

    if (thumbnailImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } })

    const updatedCategory = await this.categoryRepository.update({
      where: { id: categoryId }, data: updateCategoryDto,
      include: { children: true, parent: true, thumbnailImage: true }
    })

    return { message: "Updated category successfully.", category: updatedCategory }
  }

  async remove(userId: number, categoryId: number): Promise<{ message: string, category: Category }> {
    const category = await this.categoryRepository.findOneOrThrow({ where: { id: categoryId, userId }, include: { children: true } })

    if (category['children']?.length > 0)
      throw new BadRequestException("Cannot delete a category that has child categories.")

    const removedCategory = await this.categoryRepository.delete({ where: { id: categoryId }, include: { children: true, parent: true, thumbnailImage: true } })

    return { message: "Removed category successfully.", category: removedCategory }
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
}
