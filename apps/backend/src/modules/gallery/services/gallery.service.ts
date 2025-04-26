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

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`;
  }
}
