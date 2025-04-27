import { Injectable } from '@nestjs/common';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { GalleryItemRepository } from '../repositories/gallery-item.repository';
import { AwsService } from '../../../modules/s3AWS/s3AWS.service';
import { GalleryRepository } from '../repositories/gallery.repository';
import { IUploadSingleFile } from '../../../common/interfaces/aws.interface';
import { GalleryItem, Prisma } from 'generated/prisma';
import { GalleryItemQueryDto } from '../dto/gallery-item-query.dto';
import { CacheService } from '../../../modules/cache/cache.service';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { pagination } from '../../../common/utils/pagination.utils';
import { MoveGalleryItemDto } from '../dto/move-gallery-item.dto';
import { DuplicateGalleryItemDto } from '../dto/duplicate-gallery-item.dto';

@Injectable()
export class GalleryItemService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly awsService: AwsService,
    private readonly galleryRepository: GalleryRepository,
    private readonly cacheService: CacheService
  ) { }

  async create(userId: number, files: Express.Multer.File[], createGalleryItemDto: CreateGalleryItemDto): Promise<{ message: string, galleryItems: GalleryItem[] }> {
    let uploadedFiles: IUploadSingleFile[] = []

    try {
      const gallery = await this.galleryRepository.findOneOrThrow({ where: { id: createGalleryItemDto.galleryId, userId } })

      const folderName = `gallery-${gallery.id}-${userId}`

      uploadedFiles = await this.awsService.uploadMultiFiles(folderName, files)

      const galleryItems = await this.galleryItemRepository.createMany({
        data: uploadedFiles.map((file, index) => ({
          fileKey: file.key,
          fileUrl: file.url,
          mimetype: files[index].mimetype,
          size: files[index].size,
          title: createGalleryItemDto.title ?? files[index].originalname,
          description: createGalleryItemDto.description,
          galleryId: gallery.id
        })),
        include: { gallery: true }
      })

      return { message: "Items created successfully.", galleryItems }
    } catch (error) {
      if (uploadedFiles.length) await this.awsService.removeFiles(uploadedFiles.map((file => file.key)))

      throw error
    }

  }

  async findAll(userId: number, { page, take, ...galleryItemsDto }: GalleryItemQueryDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { endDate, sortBy, sortDirection, startDate, description, includeGallery, title, fileKey, fileUrl, galleryId, mimetype, maxSize, minSize } = galleryItemsDto;

    const sortedDto = sortObject(galleryItemsDto);

    const cacheKey = `${CacheKeys.GalleryItems}_${JSON.stringify(sortedDto)}`;

    const cachedGalleryItems = await this.cacheService.get<null | GalleryItem[]>(cacheKey);

    if (cachedGalleryItems) return { ...pagination(paginationDto, cachedGalleryItems) }

    const filters: Prisma.GalleryItemWhereInput = { gallery: { userId } };

    if (fileKey) filters.fileKey = fileKey
    if (fileUrl) filters.fileUrl = fileUrl
    if (mimetype) filters.mimetype = mimetype
    if (galleryId) filters.galleryId = galleryId
    if (minSize || maxSize) {
      filters.size = {}
      if (minSize) filters.size.gte = minSize
      if (maxSize) filters.size.lte = maxSize
    }
    if (description) filters.description = { contains: description, mode: "insensitive" };
    if (title) filters.title = { contains: title, mode: "insensitive" };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const galleryItems = await this.galleryItemRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { gallery: includeGallery }
    });

    await this.cacheService.set(cacheKey, galleryItems, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, galleryItems) }
  }

  findOne(id: number, userId: number): Promise<never | GalleryItem> {
    return this.galleryItemRepository.findOneOrThrow({ where: { id, gallery: { userId } }, include: { gallery: true } })
  }

  async update(galleryItemId: number, userId: number, updateGalleryItemDto: UpdateGalleryItemDto): Promise<{ message: string, galleryItem: GalleryItem }> {
    await this.galleryItemRepository.findOneOrThrow({ where: { id: galleryItemId, gallery: { userId } } })

    const updatedGalleryItem = await this.galleryItemRepository.update({ where: { id: galleryItemId, gallery: { userId } }, data: { ...updateGalleryItemDto } })

    return { message: "Updated gallery item successfully.", galleryItem: updatedGalleryItem }
  }

  async move(galleryItemId: number, userId: number, { galleryId }: MoveGalleryItemDto): Promise<{ message: string, galleryItem: GalleryItem }> {
    const galleryItem = await this.galleryItemRepository.findOneOrThrow({ where: { id: galleryItemId, gallery: { userId }, NOT: { galleryId } } })
    const gallery = await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } })

    const newKey = `gallery-${userId}-${gallery.id}/${galleryItem.fileKey.split('/')[1]}`

    await this.awsService.moveFile(galleryItem.fileKey, newKey)
    const { url: fileUrl } = await this.awsService.getFileUrl(newKey)

    const updatedGalleryItem = await this.galleryItemRepository.update({ where: { id: galleryItemId, gallery: { userId } }, data: { fileKey: newKey, fileUrl, galleryId } })

    return { message: "Moved galleryItem to other gallery successfully", galleryItem: updatedGalleryItem }
  }

  async duplicate(galleryItemId: number, userId: number, { galleryId }: DuplicateGalleryItemDto): Promise<{ message: string, galleryItem: GalleryItem }> {
    const galleryItem = await this.galleryItemRepository.findOneOrThrow({ where: { id: galleryItemId, gallery: { userId }, NOT: { galleryId } } })
    const gallery = await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } })

    const newKey = `gallery-${userId}-${gallery.id}/${galleryItem.fileKey.split('/')[1]}`

    await this.awsService.copyFile(galleryItem.fileKey, newKey)
    const { url: fileUrl } = await this.awsService.getFileUrl(newKey)

    const newGalleryItem = await this.galleryItemRepository.create({
      data: {
        fileKey: newKey,
        fileUrl,
        mimetype: galleryItem.mimetype,
        size: galleryItem.size,
        title: galleryItem.title,
        galleryId,
        description: galleryItem.description
      }
    })

    return { message: "Duplicated galleryItem to other gallery successfully", galleryItem: newGalleryItem }
  }

  async remove(galleryItemId: number, userId: number): Promise<{ message: string, galleryItem: GalleryItem }> {
    const galleryItem = await this.galleryItemRepository.findOneOrThrow({ where: { id: galleryItemId, gallery: { userId } } })

    await this.awsService.removeFile(galleryItem.fileKey)

    const removedGalleryItem = await this.galleryItemRepository.delete({ where: { id: galleryItemId, gallery: { userId } } })

    return { message: "Removed gallery item successfully.", galleryItem: removedGalleryItem }
  }
}
