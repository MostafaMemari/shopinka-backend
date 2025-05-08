import { Injectable, Logger } from '@nestjs/common';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { GalleryItemRepository } from '../repositories/gallery-item.repository';
import { AwsService } from '../../../modules/s3AWS/s3AWS.service';
import { GalleryRepository } from '../repositories/gallery.repository';
import { IUploadSingleFile } from '../../../common/interfaces/aws.interface';
import { GalleryItem, Prisma } from 'generated/prisma';
import { GalleryItemQueryDto } from '../dto/gallery-item-query.dto';
import { CacheService } from '../../../modules/cache/cache.service';
import { resizeImageWithSharp, sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { pagination } from '../../../common/utils/pagination.utils';
import { MoveGalleryItemDto } from '../dto/move-gallery-item.dto';
import { DuplicateGalleryItemDto } from '../dto/duplicate-gallery-item.dto';
import { RemoveGalleryItemDto } from '../dto/remove-gallery-item.dto';
import { GalleryItemMessages } from '../enums/gallery-item-messages.enum';
import { RestoreGalleryItemDto } from '../dto/restore-gallery-item.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GalleryItemService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes
  private readonly logger: Logger = new Logger(GalleryItemService.name)

  constructor(
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly awsService: AwsService,
    private readonly galleryRepository: GalleryRepository,
    private readonly cacheService: CacheService
  ) { }

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleTrashCleanup() {
    this.logger.log('Starting trash cleanup process...');

    try {
      const now = new Date();
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const galleryItems = await this.galleryItemRepository.findAll({
        where: {
          isDeleted: true,
          deletedAt: { not: null },
        },
      });

      for (const item of galleryItems) {
        if (item.deletedAt && new Date(item.deletedAt) < oneMonthAgo) {
          await this.awsService.removeFile(item.fileKey);
          await this.galleryItemRepository.delete({ where: { id: item.id } });

          this.logger.warn(`GalleryItem ${item.id} permanently deleted after 1 month.`);
        }
      }

      this.logger.log('Trash cleanup process completed successfully.');
    } catch (error) {
      this.logger.error(`Error during trash cleanup process: ${error.message}`, error.stack);
    }
  }


  async create(userId: number, files: Express.Multer.File[], createGalleryItemDto: CreateGalleryItemDto): Promise<{ message: string, galleryItems: GalleryItem[] }> {
    let originals: IUploadSingleFile[] = []
    let thumbnails: IUploadSingleFile[] = []

    const gallery = await this.galleryRepository.findOneOrThrow({
      where: { id: createGalleryItemDto.galleryId, userId },
    })

    const folder = `gallery-${gallery.id}-${userId}`

    try {
      originals = await this.awsService.uploadMultiFiles(folder, files)

      thumbnails = await this.generateAndUploadThumbnails(files, folder)

      const galleryItems = await this.galleryItemRepository.createMany({
        data: originals.map((file, index) => ({
          fileKey: file.key,
          fileUrl: file.url,
          thumbnailKey: thumbnails[index].key,
          thumbnailUrl: thumbnails[index].url,
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
      if (originals.length) await this.awsService.removeFiles(originals.map((file => file.key)))
      if (thumbnails.length) await this.awsService.removeFiles(thumbnails.map((file => file.key)))

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

  private async generateAndUploadThumbnails(
    files: Express.Multer.File[],
    folder: string
  ): Promise<IUploadSingleFile[]> {
    const thumbnails: IUploadSingleFile[] = []

    for (const file of files) {
      const thumbnail = await resizeImageWithSharp(file.buffer, {
        height: 100,
        width: 100,
        name: file.originalname,
      })

      const upload = await this.awsService.uploadSingleFile({
        folderName: folder,
        fileMetadata: { file: thumbnail.buffer, fileName: file.originalname },
      })

      thumbnails.push(upload)
    }

    return thumbnails
  }
}
