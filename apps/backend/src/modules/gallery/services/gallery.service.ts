import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { GalleryRepository } from '../repositories/gallery.repository';
import { Gallery, Prisma } from 'generated/prisma';
import { QueryGalleriesDto } from '../dto/gallery-query.dto';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { CacheService } from '../../../modules/cache/cache.service';
import { pagination } from '../../../common/utils/pagination.utils';

@Injectable()
export class GalleryService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* minutes

  constructor(
    private readonly cacheService: CacheService,
    private readonly galleryRepository: GalleryRepository
  ) { }

  async create(userId: number, createGalleryDto: CreateGalleryDto): Promise<{ message: string, gallery: Gallery }> {
    const existingGallery = await this.galleryRepository.findOne({ where: { title: { equals: createGalleryDto.title, mode: "insensitive" } } })

    if (existingGallery) throw new ConflictException("Gallery with this title already exists.")

    const gallery = await this.galleryRepository.create({ data: { ...createGalleryDto, userId } })

    return { message: 'Gallery created successfully', gallery }
  }

  async findAll(userId: number, { page, take, ...galleriesFiltersDto }: QueryGalleriesDto) {
    const paginationDto = { page, take };
    const { endDate, sortBy, sortDirection, startDate, description, includeItems, title } = galleriesFiltersDto;

    const sortedDto = sortObject(galleriesFiltersDto);

    const cacheKey = `${CacheKeys.Galleries}_${JSON.stringify(sortedDto)}`;

    const cachedGalleries = await this.cacheService.get<null | Gallery[]>(cacheKey);

    if (cachedGalleries) return { ...pagination(paginationDto, cachedGalleries) }

    const filters: Prisma.GalleryWhereInput = { userId };

    if (description) filters.description = { contains: description, mode: "insensitive" };
    if (title) filters.title = { contains: title, mode: "insensitive" };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const galleries = await this.galleryRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { items: includeItems }
    });

    await this.cacheService.set(cacheKey, galleries, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, galleries) }
  }

  findOne(galleryId: number, userId: number): Promise<never | Gallery> {
    return this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId }, include: { items: true } })
  }

  async update(galleryId: number, userId: number, updateGalleryDto: UpdateGalleryDto): Promise<{ message: string, gallery: Gallery }> {
    const existingGallery = await this.galleryRepository.findOne({
      where: {
        title: {
          equals: updateGalleryDto.title, mode: "insensitive"
        },
        NOT: { id: galleryId },
        userId
      }
    })

    if (existingGallery) throw new ConflictException("Gallery with this title already exists.")


    const updatedGallery = await this.galleryRepository.update({
      where: { id: galleryId, userId },
      data: { ...updateGalleryDto, updatedAt: new Date() }
    })

    return { message: "Updated gallery successfully.", gallery: updatedGallery }
  }

  async remove(galleryId: number, userId: number): Promise<{ message: string, gallery: Gallery }> {
    await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } })

    const removedGallery = await this.galleryRepository.delete({ where: { id: galleryId, userId } })

    return { message: "Removed gallery successfully", gallery: removedGallery }
  }
}
