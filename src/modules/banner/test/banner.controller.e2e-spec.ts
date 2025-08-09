import { Test, TestingModule } from '@nestjs/testing';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { BannerModule } from '../banner.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import pactum from 'pactum';
import { BannerMessages } from '../enums/banner-messages.enum';

describe('bannerController e2e', () => {
  let app: INestApplication;
  let url: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [BannerModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.listen(0);
    url = await app.getUrl();
    pactum.request.setBaseUrl(url.replace('[::1]', 'localhost'));
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /banner', () => {
    it('should return list of banners', async () => {
      await pactum
        .spec()
        .get('/banner')
        .expectStatus(HttpStatus.OK)
        .expectBody({ items: [], pager: { currentPage: 1, totalCount: 0, totalPages: 0, hasNextPage: false, hasPreviousPage: false } });
    });
  });

  describe('GET /banner/:id', () => {
    it('should return a not found status code for not found banner', async () => {
      await pactum
        .spec()
        .get('/banner/2')
        .expectStatus(HttpStatus.NOT_FOUND)
        .expectBody({ statusCode: HttpStatus.NOT_FOUND, error: 'Not Found', message: BannerMessages.NotFoundBanner });
    });
  });
});
