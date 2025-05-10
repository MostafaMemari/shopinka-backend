import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';
import { CacheService } from '../cache/cache.service';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { Tag } from 'generated/prisma';
import { TagMessages } from './enums/tag-messages.enum';

@Injectable()
export class TagService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly tagRepository: TagRepository,
    private readonly cacheService: CacheService,
    private readonly galleryItemRepository: GalleryItemRepository,
  ) { }


  async create(userId: number, createTagDto: CreateTagDto): Promise<{ message: string, tag: Tag }> {
    const { name, thumbnailImageId, slug } = createTagDto

    if (thumbnailImageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: thumbnailImageId } })

    const uniqueSlug = slug ?? await this.generateUniqueSlug(name)

    const newTag = await this.tagRepository.create({ data: { ...createTagDto, userId, slug: uniqueSlug } })

    return { message: TagMessages.CreatedTagSuccess, tag: newTag }
  }

  findAll() {
    return `This action returns all tag`;
  }

  findOne(id: number): Promise<Tag> {
    return this.tagRepository.findOneOrThrow({
      where: { id },
      include: { blogs: true, products: true, seoMeta: true, thumbnailImage: true, user: { select: { id: true, fullName: true } } }
    })
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let suffix = 0
    let slug = name

    while (await this.tagRepository.findOne({ where: { slug } })) {
      suffix++
      slug = `${name}-${suffix}`
    }

    return slug
  }
}
