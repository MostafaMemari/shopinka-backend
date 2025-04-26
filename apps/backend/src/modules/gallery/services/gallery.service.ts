import { ConflictException, Injectable } from '@nestjs/common';
import { CreateGalleryDto } from '../dto/create-gallery.dto';
import { UpdateGalleryDto } from '../dto/update-gallery.dto';
import { GalleryRepository } from '../repositories/gallery.repository';
import { Gallery, User } from 'generated/prisma';

@Injectable()
export class GalleryService {
  constructor(private readonly galleryRepository: GalleryRepository) { }

  async create(userId: number, createGalleryDto: CreateGalleryDto): Promise<{ message: string, gallery: Gallery }> {
    const existingGallery = await this.galleryRepository.findOne({ where: { title: { equals: createGalleryDto.title, mode: "insensitive" } } })

    if (existingGallery) throw new ConflictException("Gallery with this title already exists.")

    const gallery = await this.galleryRepository.create({ data: { ...createGalleryDto, userId } })

    return { message: 'Gallery created successfully', gallery }
  }

  findAll() {
    return `This action returns all gallery`;
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
