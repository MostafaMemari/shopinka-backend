import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { GalleryRepository } from '../repositories/gallery.repository';
import { Gallery, Prisma } from '@prisma/client';
import { QueryGalleriesDto } from '../dto/gallery-query.dto';
import { pagination } from '../../../common/utils/pagination.utils';
import { GalleryMessages } from '../enums/gallery.messages';
import { GalleryItemService } from './gallery-item.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly galleryRepository: GalleryRepository,
    private readonly galleryItemService: GalleryItemService,
  ) {}

  async create(userId: number, createGalleryDto: CreateGalleryDto): Promise<{ message: string; gallery: Gallery }> {
    const existingGallery = await this.galleryRepository.findOne({
      where: { title: { equals: createGalleryDto.title } },
    });

    if (existingGallery) throw new ConflictException(GalleryMessages.AlreadyExistsGallery);

    const gallery = await this.galleryRepository.create({ data: { ...createGalleryDto, userId } });

    return { message: GalleryMessages.CreatedGallerySuccess, gallery };
  }

  async findAll(userId: number, { page, take, ...galleriesFiltersDto }: QueryGalleriesDto) {
    const paginationDto = { page, take };
    const { endDate, sortBy, sortDirection, startDate, description, includeItems, title } = galleriesFiltersDto;

    const filters: Prisma.GalleryWhereInput = { userId };

    if (description) filters.description = { contains: description };
    if (title) filters.title = { contains: title };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const galleries = await this.galleryRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { items: includeItems },
    });

    return { ...pagination(paginationDto, galleries) };
  }

  findOne(galleryId: number, userId: number): Promise<never | Gallery> {
    return this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId }, include: { items: true } });
  }

  async update(galleryId: number, userId: number, updateGalleryDto: UpdateGalleryDto): Promise<{ message: string; gallery: Gallery }> {
    let existingGallery: Gallery;

    if (updateGalleryDto.title) {
      existingGallery = await this.galleryRepository.findOne({
        where: { title: { equals: updateGalleryDto.title }, NOT: { id: galleryId }, userId },
      });
    }

    if (existingGallery) throw new ConflictException(GalleryMessages.AlreadyExistsGallery);

    const updatedGallery = await this.galleryRepository.update({
      where: { id: galleryId, userId },
      data: { ...updateGalleryDto, updatedAt: new Date() },
    });

    return { message: GalleryMessages.UpdatedGallerySuccess, gallery: updatedGallery };
  }

  async remove(galleryId: number, userId: number): Promise<{ message: string; gallery: Gallery }> {
    const gallery = await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId }, include: { items: true } });

    await this.galleryItemService.remove(userId, { isForce: true, galleryItemIds: gallery['items'].map((i) => i.id) });

    const removedGallery = await this.galleryRepository.delete({ where: { id: galleryId, userId } });

    return { message: GalleryMessages.RemovedGallerySuccess, gallery: removedGallery };
  }
}
