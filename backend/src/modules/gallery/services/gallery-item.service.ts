import { Injectable, Logger } from '@nestjs/common';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { GalleryItemRepository } from '../repositories/gallery-item.repository';
import { AwsService } from '../../../modules/s3AWS/s3AWS.service';
import { GalleryRepository } from '../repositories/gallery.repository';
import { IUploadSingleFile } from '../../../common/interfaces/aws.interface';
import { GalleryItem, Prisma } from '@prisma/client';
import { GalleryItemQueryDto } from '../dto/gallery-item-query.dto';

import { resizeImageWithSharp } from '../../../common/utils/functions.utils';
import { pagination } from '../../../common/utils/pagination.utils';
import { MoveGalleryItemDto } from '../dto/move-gallery-item.dto';
import { DuplicateGalleryItemDto } from '../dto/duplicate-gallery-item.dto';
import { RemoveGalleryItemDto } from '../dto/remove-gallery-item.dto';
import { GalleryItemMessages } from '../enums/gallery-item-messages.enum';
import { RestoreGalleryItemDto } from '../dto/restore-gallery-item.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class GalleryItemService {
  private readonly GALLERY_ITEM_FOLDER = 'galleryItemImages';
  private readonly logger: Logger = new Logger(GalleryItemService.name);

  constructor(
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly awsService: AwsService,
    private readonly galleryRepository: GalleryRepository,
  ) {}

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

  async create(
    userId: number,
    files: Express.Multer.File[],
    createGalleryItemDto: CreateGalleryItemDto,
  ): Promise<{ message: string; galleryItems: GalleryItem[] }> {
    let originals: IUploadSingleFile[] = [];
    let thumbnails: IUploadSingleFile[] = [];

    const gallery = await this.galleryRepository.findOneOrThrow({
      where: { id: createGalleryItemDto.galleryId, userId },
    });

    const folder = this.GALLERY_ITEM_FOLDER;

    try {
      originals = await this.awsService.uploadMultiFiles(folder, files);

      thumbnails = await this.generateAndUploadThumbnails(files, folder);

      const galleryItems = await Promise.all(
        originals.map((file, index) =>
          this.galleryItemRepository.create({
            data: {
              fileKey: file.key,
              fileUrl: file.url,
              thumbnailKey: thumbnails[index].key,
              thumbnailUrl: thumbnails[index].url,
              mimetype: files[index].mimetype,
              size: files[index].size,
              title: createGalleryItemDto.title ?? files[index].originalname,
              description: createGalleryItemDto.description,
              galleryId: gallery.id,
            },
            include: { gallery: true },
          }),
        ),
      );

      return { message: GalleryItemMessages.CreatedGalleryItemsSuccess, galleryItems };
    } catch (error) {
      if (originals.length) await this.awsService.removeFiles(originals.map((file) => file.key));
      if (thumbnails.length) await this.awsService.removeFiles(thumbnails.map((file) => file.key));

      throw error;
    }
  }

  async findAll(userId: number, { page, take, ...galleryItemsDto }: GalleryItemQueryDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      endDate,
      sortBy,
      sortDirection,
      startDate,
      description,
      includeGallery,
      title,
      fileKey,
      fileUrl,
      galleryId,
      mimetype,
      maxSize,
      minSize,
      isDeleted,
      deletedAt,
      includeTags,
      includeSeoMeta,
    } = galleryItemsDto;

    const filters: Prisma.GalleryItemWhereInput = { gallery: { userId } };

    if (isDeleted !== undefined) filters.isDeleted = isDeleted;
    if (deletedAt) filters.deletedAt = new Date(deletedAt);
    if (fileKey) filters.fileKey = fileKey;
    if (fileUrl) filters.fileUrl = fileUrl;
    if (mimetype) filters.mimetype = mimetype;
    if (galleryId) filters.galleryId = galleryId;
    if (minSize || maxSize) {
      filters.size = {};
      if (minSize) filters.size.gte = minSize;
      if (maxSize) filters.size.lte = maxSize;
    }
    if (description) filters.description = { contains: description };
    if (title) filters.title = { contains: title };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const galleryItems = await this.galleryItemRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { seoMeta: includeSeoMeta, tags: includeTags, gallery: includeGallery },
    });

    return { ...pagination(paginationDto, galleryItems) };
  }

  findOne(id: number, userId: number): Promise<never | GalleryItem> {
    return this.galleryItemRepository.findOneOrThrow({
      where: { id, gallery: { userId } },
      include: { tags: true, seoMeta: true, gallery: true },
    });
  }

  async update(
    galleryItemId: number,
    userId: number,
    updateGalleryItemDto: UpdateGalleryItemDto,
  ): Promise<{ message: string; galleryItem: GalleryItem }> {
    await this.galleryItemRepository.findOneOrThrow({ where: { id: galleryItemId, gallery: { userId } } });

    const updatedGalleryItem = await this.galleryItemRepository.update({
      where: { id: galleryItemId, gallery: { userId } },
      data: { ...updateGalleryItemDto },
    });

    return { message: GalleryItemMessages.UpdatedGalleryItemsSuccess, galleryItem: updatedGalleryItem };
  }

  async move(userId: number, { galleryId, galleryItemIds }: MoveGalleryItemDto): Promise<{ message: string; galleryItems: GalleryItem[] }> {
    await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } });

    const galleryItems = await this.galleryItemRepository.findAll({
      where: { id: { in: galleryItemIds }, gallery: { userId }, NOT: { galleryId }, isDeleted: false },
    });

    const updatedItems = await Promise.all(
      galleryItems.map((item) =>
        this.galleryItemRepository.update({
          where: { id: item.id },
          data: { galleryId },
          include: { gallery: true },
        }),
      ),
    );

    return {
      message: GalleryItemMessages.MovedGalleryItemsSuccess,
      galleryItems: updatedItems,
    };
  }

  async duplicate(
    userId: number,
    { galleryId, galleryItemIds }: DuplicateGalleryItemDto,
  ): Promise<{ message: string; galleryItems: GalleryItem[] }> {
    await this.galleryRepository.findOneOrThrow({ where: { id: galleryId, userId } });

    const galleryItems = await this.galleryItemRepository.findAll({
      where: { id: { in: galleryItemIds }, gallery: { userId }, NOT: { galleryId }, isDeleted: false },
    });

    const duplicatedGalleryItems = await Promise.all(
      galleryItems.map((i) =>
        this.galleryItemRepository.create({
          data: {
            ...i,
            id: undefined,
            galleryId,
            createdAt: undefined,
            updatedAt: undefined,
          },
        }),
      ),
    );

    return {
      message: GalleryItemMessages.DuplicatedGalleryItemsSuccess,
      galleryItems: duplicatedGalleryItems,
    };
  }

  async restore(userId: number, { galleryItemIds }: RestoreGalleryItemDto): Promise<{ message: string; galleryItems: GalleryItem[] }> {
    await this.galleryItemRepository.updateMany({
      where: { id: { in: galleryItemIds }, gallery: { userId } },
      data: { isDeleted: false, deletedAt: null },
    });

    const updatedGalleryItems = await this.galleryItemRepository.findAll({
      where: { id: { in: galleryItemIds }, gallery: { userId } },
    });

    return { message: GalleryItemMessages.RestoredGalleryItemsSuccess, galleryItems: updatedGalleryItems };
  }

  async remove(
    userId: number,
    { galleryItemIds, isForce }: RemoveGalleryItemDto,
  ): Promise<{ message: string; galleryItems: GalleryItem[] }> {
    const galleryItems = await this.galleryItemRepository.findAll({
      where: { id: { in: galleryItemIds }, gallery: { userId } },
    });

    if (isForce) {
      await this.awsService.removeFiles(galleryItems.map((item) => item.fileKey));
      await this.awsService.removeFiles(galleryItems.map((item) => item.thumbnailKey));

      await this.galleryItemRepository.deleteMany({ where: { id: { in: galleryItemIds }, gallery: { userId } } });

      return { message: GalleryItemMessages.RemovedGalleryItemsSuccess, galleryItems };
    }

    await this.galleryItemRepository.updateMany({
      where: { id: { in: galleryItemIds }, gallery: { userId } },
      data: { deletedAt: new Date(), isDeleted: true },
    });

    const updatedGalleryItems = await this.galleryItemRepository.findAll({
      where: { id: { in: galleryItemIds }, gallery: { userId } },
    });

    return {
      message: GalleryItemMessages.TrashedGalleryItemsSuccess,
      galleryItems: updatedGalleryItems,
    };
  }

  private async generateAndUploadThumbnails(files: Express.Multer.File[], folder: string): Promise<IUploadSingleFile[]> {
    const thumbnails: IUploadSingleFile[] = [];

    for (const file of files) {
      const thumbnail = await resizeImageWithSharp(file.buffer, {
        height: 100,
        width: 100,
        name: file.originalname,
      });

      const upload = await this.awsService.uploadSingleFile({
        folderName: folder,
        fileMetadata: { file: thumbnail.buffer, fileName: file.originalname },
      });

      thumbnails.push(upload);
    }

    return thumbnails;
  }
}
