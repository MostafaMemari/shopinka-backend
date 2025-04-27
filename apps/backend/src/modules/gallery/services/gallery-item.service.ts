import { Injectable } from '@nestjs/common';
import { CreateGalleryItemDto } from '../dto/create-gallery-item.dto';
import { UpdateGalleryItemDto } from '../dto/update-gallery-item.dto';
import { GalleryItemRepository } from '../repositories/gallery-item.repository';
import { AwsService } from '../../../modules/s3AWS/s3AWS.service';
import { GalleryRepository } from '../repositories/gallery.repository';
import { IUploadSingleFile } from '../../../common/interfaces/aws.interface';

@Injectable()
export class GalleryItemService {
  constructor(
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly awsService: AwsService,
    private readonly galleryRepository: GalleryRepository
  ) { }

  async create(userId: number, file: Express.Multer.File, createGalleryItemDto: CreateGalleryItemDto) {
    let uploadedFile: null | IUploadSingleFile = null

    try {
      const gallery = await this.galleryRepository.findOneOrThrow({ where: { id: createGalleryItemDto.galleryId, userId } })

      const folderName = `gallery-${gallery.id}-${userId}`

      uploadedFile = await this.awsService.uploadSingleFile({ fileMetadata: file, folderName, isPublic: false })

      const galleryItem = await this.galleryItemRepository.create({
        data: {
          fileKey: uploadedFile.key,
          fileUrl: uploadedFile.url,
          mimetype: file.mimetype,
          size: file.size,
          title: createGalleryItemDto.title ?? file.originalname,
          description: createGalleryItemDto.description,
          galleryId: gallery.id
        },
        include: { gallery: true }
      })

      return { message: "Item created successfully.", galleryItem }
    } catch (error) {
      if (uploadedFile) await this.awsService.removeFile(uploadedFile.key)

      throw error
    }

  }

  findAll() {
    return `This action returns all galleryItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} galleryItem`;
  }

  update(id: number, updateGalleryItemDto: UpdateGalleryItemDto) {
    return `This action updates a #${id} galleryItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} galleryItem`;
  }
}
