import { Test, TestingModule } from '@nestjs/testing';
import { BannerService } from '../../banner.service';
import { AuthService } from '../../../auth/auth.service';
import { UserRepository } from '../../../user/user.repository';
import { BannerRepository } from '../../banner.repository';
import { GalleryItemRepository } from '../../../gallery/repositories/gallery-item.repository';
import { CreateBannerDto } from '../../dto/create-banner.dto';
import { bannerStub } from '../stubs/banner.stub';
import { BannerMessages } from '../../enums/banner-messages.enum';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { QueryBannerDto } from '../../dto/query-banner.dto';
import * as paginationUtils from '../../../../common/utils/pagination.utils';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('BannerService (Unit)', () => {
  let service: BannerService;

  const bannerRepositoryMock = {
    create: vi.fn().mockResolvedValue(bannerStub()),
    delete: vi.fn().mockResolvedValue(bannerStub()),
    findOneOrThrow: vi.fn().mockResolvedValue(bannerStub()),
    update: vi.fn().mockResolvedValue(bannerStub()),
    findOne: vi.fn().mockResolvedValue(bannerStub()),
    findAll: vi.fn().mockResolvedValueOnce([bannerStub(), bannerStub()]),
  };

  const galleryItemRepositoryMock = {
    findOneOrThrow: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BannerService,
        { provide: BannerRepository, useValue: bannerRepositoryMock },
        { provide: AuthService, useValue: {} },
        { provide: UserRepository, useValue: {} },
        { provide: GalleryItemRepository, useValue: galleryItemRepositoryMock },
      ],
    }).compile();

    service = module.get<BannerService>(BannerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    const bannerStubData = bannerStub();

    it('should crete a banner', async () => {
      const { imageId, link, type, isActive } = bannerStubData;
      const dto: CreateBannerDto = { imageId, link, type, isActive };

      const actual = await service.create(dto);

      expect(actual.banner).toEqual(bannerStubData);
      expect(actual.message).toBe(BannerMessages.CreatedBannerSuccess);

      expect(galleryItemRepositoryMock.findOneOrThrow).toHaveBeenCalled();
      expect(bannerRepositoryMock.create).toHaveBeenCalled();
    });

    it('should throw error when not found imageId', async () => {
      vi.spyOn(galleryItemRepositoryMock, 'findOneOrThrow').mockImplementation((imageId) => {
        if (imageId) return Promise.reject(new NotFoundException('Not found galleryItem.'));

        return Promise.reject(new Error('ImageId not provided.'));
      });

      const { imageId, link, isActive, type } = bannerStubData;
      const dto: CreateBannerDto = { imageId, link, isActive, type };

      try {
        expect(await service.create(dto)).toBeUndefined();
      } catch (error) {
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(galleryItemRepositoryMock.findOneOrThrow).toHaveBeenCalled();
      }
    });
  });

  describe('remove()', () => {
    const bannerStubData = bannerStub();

    it('should remove a banner', async () => {
      const actual = await service.remove(bannerStubData.id);

      expect(actual.banner).toEqual(bannerStubData);
      expect(actual.message).toBe(BannerMessages.RemovedBannerSuccess);

      expect(bannerRepositoryMock.findOneOrThrow).toHaveBeenCalled();
    });

    it('should throw error when not found banner provided', async () => {
      vi.spyOn(bannerRepositoryMock, 'findOneOrThrow').mockImplementationOnce((bannerId) => {
        if (bannerId) return Promise.reject(new NotFoundException('Not found banner.'));

        return Promise.reject(new Error('bannerId not provided.'));
      });

      try {
        const actual = await service.remove(1);
        expect(actual).toBeUndefined();
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Not found banner.');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
        expect(bannerRepositoryMock.findOneOrThrow).toHaveBeenCalled();
      }
    });
  });

  describe('update()', () => {
    const bannerStubData = bannerStub();
    it('should update a banner', async () => {
      const { imageId, isActive, link, type, id } = bannerStubData;
      const actual = await service.update(id, { imageId, isActive, link, type });

      expect(actual.banner).toEqual(bannerStubData);
      expect(actual.message).toBe(BannerMessages.UpdatedBannerSuccess);
      expect(bannerRepositoryMock.update).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    const bannerStubData = bannerStub();
    it('should return a banner', async () => {
      const actual = await service.findOne(bannerStubData.id);

      expect(actual).toEqual(bannerStubData);
      expect(bannerRepositoryMock.findOneOrThrow).toHaveBeenCalled();
    });
  });

  describe('findAll()', () => {
    const bannerStubData = bannerStub();
    it('should return list of banners', async () => {
      const pager = { currentPage: 1, hasNextPage: false, hasPreviousPage: false, totalCount: 2, totalPages: 1 };

      vi.spyOn(paginationUtils, 'pagination').mockReturnValue({ items: [bannerStubData, bannerStubData], pager });

      const { link, isActive, type } = bannerStubData;
      const queryBannerDto: QueryBannerDto = { page: 1, take: 10, name: link, isActive, type, includeImage: true };

      const actual = await service.findAll(queryBannerDto);

      expect(actual).toBeDefined();
      expect(actual).toEqual({ items: [bannerStubData, bannerStubData], pager });
      expect((actual as any).items).toHaveLength(2);
      expect(bannerRepositoryMock.findAll).toHaveBeenCalled();
      expect(paginationUtils.pagination).toHaveBeenCalled();
    });
  });
});
