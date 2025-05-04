import { ConflictException, Injectable } from '@nestjs/common';
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
    return this.categoryRepository.findOneOrThrow({ where: { id }, include: { user: true, children: true, parent: true, thumbnailImage: true } })
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
