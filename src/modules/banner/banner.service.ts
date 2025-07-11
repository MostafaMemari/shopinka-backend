import { BadRequestException, Injectable } from '@nestjs/common';
import { Banner, Prisma } from '@prisma/client';
import { BannerRepository } from './banner.repository';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { QueryBannerDto } from './dto/query-banner.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { GalleryItemRepository } from '../gallery/repositories/gallery-item.repository';
import { BannerMessages } from './enums/banner-messages.enum';

@Injectable()
export class BannerService {
  constructor(
    private readonly galleryItemRepository: GalleryItemRepository,
    private readonly bannerRepository: BannerRepository,
  ) {}

  async create(createBannerDto: CreateBannerDto): Promise<{ message: string; banner: Banner }> {
    const { imageId, link, type, isActive } = createBannerDto;

    if (imageId) await this.galleryItemRepository.findOneOrThrow({ where: { id: imageId } });

    const banner = await this.bannerRepository.create({
      data: {
        imageId,
        link,
        type,
        isActive: isActive ?? true,
      },
    });

    return { message: BannerMessages.CreatedBannerSuccess, banner };
  }

  async findAll({ page, take, ...queryBannerDto }: QueryBannerDto): Promise<unknown> {
    const paginationDto = { page, take };

    const { name, isActive, type, includeImage } = queryBannerDto;

    const where: any = {};
    if (name) where.link = { contains: name, mode: 'insensitive' };
    if (isActive !== undefined) where.isActive = isActive;
    if (type) where.type = type;

    const include: Prisma.BannerInclude = {
      image: includeImage,
    };

    const banners = await this.bannerRepository.findAll({
      where,
      include,
    });

    return { ...pagination(paginationDto, banners) };
  }

  async findOne(id: number): Promise<Banner> {
    return this.bannerRepository.findOneOrThrow({
      where: { id },
      include: { image: true },
    });
  }

  async update(id: number, updateBannerDto: UpdateBannerDto): Promise<{ message: string; banner: Banner }> {
    const { imageId, link, type, isActive } = updateBannerDto;

    const updatedBanner = await this.bannerRepository.update({
      where: { id },
      data: {
        imageId,
        link,
        type,
        isActive,
      },
      include: { image: true },
    });

    return { message: BannerMessages.UpdatedBannerSuccess, banner: updatedBanner };
  }

  async remove(id: number): Promise<{ message: string; banner: Banner }> {
    await this.bannerRepository.findOneOrThrow({ where: { id: id } });

    const removedBanner = await this.bannerRepository.delete({ where: { id } });

    return { message: BannerMessages.RemovedBannerSuccess, banner: removedBanner };
  }
}
