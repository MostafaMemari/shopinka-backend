import { Test, TestingModule } from '@nestjs/testing';
import { afterEach, afterAll, beforeAll, describe, expect, it } from 'vitest';
import { BannerService } from '../banner.service';
import { GalleryItemRepository } from '../../gallery/repositories/gallery-item.repository';
import { BannerRepository } from '../banner.repository';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBannerDto } from '../dto/create-banner.dto';
import { BannerType } from '../enums/banner-type.enum';
import { BannerMessages } from '../enums/banner-messages.enum';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { UpdateBannerDto } from '../dto/update-banner.dto';

describe('BannerService Int', () => {
  let service: BannerService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [BannerService, GalleryItemRepository, BannerRepository, PrismaService],
    }).compile();

    service = moduleRef.get<BannerService>(BannerService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
    await prisma.cleanDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  const createBannerDto: CreateBannerDto = { imageId: 1, link: 'https://shopinka.ir', type: BannerType.MAIN_SLIDER, isActive: true };
  let userId: number;

  it('should create user', async () => {
    const user = await prisma.user.create({
      data: { mobile: '09922101234', role: 'SUPER_ADMIN', fullName: 'Sajad Dev', isVerifiedMobile: true },
    });

    userId = user.id;
  });

  it('should create gallery and galleryItem', async () => {
    const gallery = await prisma.gallery.create({ data: { title: 'My gallery', userId } });
    const galleryItem = await prisma.galleryItem.create({
      data: { fileKey: '<Fake>', fileUrl: '<Fake>', mimetype: '<Fake>', size: 200, galleryId: gallery.id, title: 'My galleryItem' },
    });
    createBannerDto.imageId = galleryItem.id;
  });

  describe('createBanner()', () => {
    afterAll(async () => await prisma.banner.deleteMany());

    it('should create and return banner', async () => {
      const createdBanner = await service.create(createBannerDto);

      expect(createdBanner.banner.id).toBeTypeOf('number');
      expect(createdBanner.banner.type).toBe(BannerType.MAIN_SLIDER);
      expect(createdBanner.banner.imageId).toBe(createBannerDto.imageId);
      expect(createdBanner.message).toBe(BannerMessages.CreatedBannerSuccess);
    });

    it('should throw error when not found imageId', async () => {
      try {
        const createBanner = await service.create({ ...createBannerDto, imageId: 1 });
        expect(createBanner).toBeUndefined();
      } catch (error) {
        expect(error.message).toBeTypeOf('string');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findAllBanner()', () => {
    afterEach(async () => await prisma.banner.deleteMany());

    it('should return list of banners', async () => {
      const { banner: banner1 } = await service.create(createBannerDto);
      const { banner: banner2 } = await service.create({ ...createBannerDto, link: 'https://api.shopinka.ir', type: BannerType.SIDE });

      const banners = await service.findAll({ page: 1, take: 2, includeImage: false, isActive: true });

      expect(banners.items).length(2);
      expect(banners.items).toStrictEqual([banner1, banner2]);
      expect(banners.pager).toEqual({ hasNextPage: false, hasPreviousPage: false, currentPage: 1, totalCount: 2, totalPages: 1 });
    });

    it('should return empty list of banners', async () => {
      const banners = await service.findAll({ page: 1, take: 1 });

      expect(banners.items).length(0);
      expect(banners.items).toEqual([]);
      expect(banners.pager).toEqual({ hasNextPage: false, hasPreviousPage: false, currentPage: 1, totalCount: 0, totalPages: 0 });
    });
  });

  describe('findOneBanner()', () => {
    it('should return a banner', async () => {
      const createdBanner = await service.create(createBannerDto);

      const banner = await service.findOne(createdBanner.banner.id);

      expect(banner.id).toBe(createdBanner.banner.id);
      expect(banner.imageId).toBe(createdBanner.banner.imageId);
    });

    it('should throw error when not found banner', async () => {
      try {
        const banner = await service.findOne(1);
        expect(banner).toBeUndefined();
      } catch (error) {
        expect(error).instanceOf(NotFoundException);
        expect(error.message).toBe(BannerMessages.NotFoundBanner);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('updateBanner()', () => {
    it('should update a banner', async () => {
      const updatedBannerDto: UpdateBannerDto = { isActive: false, type: BannerType.SIDE };

      const createdBanner = await service.create(createBannerDto);

      const updatedBanner = await service.update(createdBanner.banner.id, updatedBannerDto);

      expect(updatedBanner.banner.isActive).toBe(updatedBannerDto.isActive);
      expect(updatedBanner.banner.type).toBe(updatedBannerDto.type);
      expect(createdBanner).not.toEqual(updatedBanner);
    });
  });

  describe('removeBanner()', () => {
    it('should remove a banner', async () => {
      const createdBanner = await service.create(createBannerDto);

      const removedBanner = await service.remove(createdBanner.banner.id);

      expect(removedBanner.banner).toEqual(createdBanner.banner);
      expect(removedBanner.message).toBe(BannerMessages.RemovedBannerSuccess);
    });

    it('should throw error when not found banner', async () => {
      const bannerId = 1;
      try {
        const banner = await service.remove(bannerId);
        expect(banner).toBeUndefined();
      } catch (error) {
        expect(error).instanceOf(NotFoundException);
        expect(error.message).toBe(BannerMessages.NotFoundBanner);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});
