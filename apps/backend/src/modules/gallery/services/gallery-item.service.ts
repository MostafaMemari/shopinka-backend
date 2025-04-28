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
import { RemoveGalleryItemDto } from '../dto/remove-gallery-item.dto';
import { GalleryItemMessages } from '../enums/gallery-item-messages.enum';
import { RestoreGalleryItemDto } from '../dto/restore-gallery-item.dto';

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

      return { message: GalleryItemMessages.CreatedGalleryItemsSuccess, galleryItems }
    } catch (error) {
      if (uploadedFiles.length) await this.awsService.removeFiles(uploadedFiles.map((file => file.key)))

      throw error
    }

  }

  async findAll(userId: number, { page, take, ...galleryItemsDto }: GalleryItemQueryDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { endDate, sortBy, sortDirection, startDate, description, includeGallery, title, fileKey, fileUrl, galleryId, mimetype, maxSize, minSize, isDeleted, deletedAt } = galleryItemsDto;

    const sortedDto = sortObject(galleryItemsDto);

    const cacheKey = `${CacheKeys.GalleryItems}_${JSON.stringify(sortedDto)}`;

    const cachedGalleryItems = await this.cacheService.get<null | GalleryItem[]>(cacheKey);

    if (cachedGalleryItems) return { ...pagination(paginationDto, cachedGalleryItems) }

    const filters: Prisma.GalleryItemWhereInput = { gallery: { userId } };

    if (isDeleted !== undefined) filters.isDeleted = isDeleted
    if (deletedAt) filters.deletedAt = new Date(deletedAt)
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
      include: { gallery: includeGallery },
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

    return { message: GalleryItemMessages.UpdatedGalleryItemsSuccess, galleryItem: updatedGalleryItem }
  }

  async move(userId: number, { galleryId, galleryItemIds }: MoveGalleryItemDto): Promise<{ message: string, galleryItems: GalleryItem[] }> {
    const galleryItems = await this.galleryItemRepository.findAll({ where: { id: { in: galleryItemIds }, gallery: { userId }, NOT: { galleryId } } })
    await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } })

    const updatedGalleryItems = galleryItems.map(async item => {
      const newKey = `gallery-${galleryId}-${userId}/${item.fileKey.split('/')[1]}`

      await this.awsService.moveFile(item.fileKey, newKey)
      const { url: fileUrl } = await this.awsService.getFileUrl(newKey)

      const updatedGalleryItem = await this.galleryItemRepository.update({ where: { id: item.id, gallery: { userId } }, data: { fileKey: newKey, fileUrl, galleryId } })

      return updatedGalleryItem
    })

    return { message: GalleryItemMessages.MovedGalleryItemsSuccess, galleryItems: await Promise.all(updatedGalleryItems) }
  }

  async duplicate(userId: number, { galleryId, galleryItemIds }: DuplicateGalleryItemDto): Promise<{ message: string, galleryItems: GalleryItem[] }> {
    const galleryItems = await this.galleryItemRepository.findAll({ where: { id: { in: galleryItemIds }, gallery: { userId }, NOT: { galleryId } } })
    await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } })

    const copiedFiles = galleryItems.map(async item => {
      const newKey = `gallery-${galleryId}-${userId}/${item.fileKey.split('/')[1]}`

      await this.awsService.copyFile(item.fileKey, newKey)
      const { url: fileUrl } = await this.awsService.getFileUrl(newKey)

      return {
        fileKey: newKey,
        fileUrl,
        mimetype: item.mimetype,
        size: item.size,
        title: item.title,
        galleryId,
        description: item.description
      }
    })

    const newGalleryItems = await this.galleryItemRepository.createMany({ data: await Promise.all(copiedFiles) })

    return { message: GalleryItemMessages.DuplicatedGalleryItemsSuccess, galleryItems: newGalleryItems }
  }

  async restore(userId: number, { galleryItemIds }: RestoreGalleryItemDto): Promise<{ message: string, galleryItems: GalleryItem[] }> {
    const updatedGalleryItems = await this.galleryItemRepository.updateMany({ where: { id: { in: galleryItemIds }, gallery: { userId } }, data: { isDeleted: false, deletedAt: null } })

    return { message: GalleryItemMessages.RestoredGalleryItemsSuccess, galleryItems: updatedGalleryItems }
  }

  async remove(userId: number, { galleryItemIds, isForce }: RemoveGalleryItemDto): Promise<{ message: string, galleryItems: GalleryItem[] }> {
    const galleryItems = await this.galleryItemRepository.findAll({ where: { id: { in: galleryItemIds }, gallery: { userId } } })

    if (isForce) {
      await this.awsService.removeFiles(galleryItems.map(item => item.fileKey))

      await this.galleryItemRepository.deleteMany({ where: { id: { in: galleryItemIds }, gallery: { userId } } })

      return { message: GalleryItemMessages.RemovedGalleryItemsSuccess, galleryItems }
    }

    const updatedGalleryItem = await this.galleryItemRepository.updateMany({ where: { id: { in: galleryItemIds } }, data: { deletedAt: new Date(), isDeleted: true } })

    return { message: GalleryItemMessages.TrashedGalleryItemsSuccess, galleryItems: updatedGalleryItem }
  }
}
