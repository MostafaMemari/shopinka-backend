import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma, ProductStatus } from '@prisma/client';
import { ProductRepository } from '../product/repositories/product.repository';
import { TorobProductsRequestDto } from './dto/torob.dto';

@Injectable()
export class TorobService {
  constructor(private readonly productRepository: ProductRepository) {}

  async handleRequest(body: TorobProductsRequestDto) {
    if (!body || Object.keys(body).length === 0) throw new BadRequestException('Request body is empty');
    if (body.page_uniques) return this.getByPageUniques(body.page_uniques);
    if (body.page_urls) return this.getByPageUrls(body.page_urls);

    if (body.page) {
      if (!body.sort) throw new BadRequestException('sort parameter is not provided');
      return this.getPaginated(body.page, body.sort);
    }

    throw new BadRequestException('Invalid request body');
  }

  async getPaginated(page: number, sort: string) {
    if (page < 1) throw new BadRequestException('Invalid page number');

    const orderBy: Prisma.ProductOrderByWithRelationInput = sort === 'date_updated_desc' ? { updatedAt: 'desc' } : { createdAt: 'desc' };

    const products = await this.productRepository.findAll({
      where: { status: ProductStatus.PUBLISHED },
      include: { mainImage: true, categories: true },
      orderBy,
    });

    const take = 100;
    const total = products.length;
    const max_pages = Math.max(1, Math.ceil(total / take));

    const start = (page - 1) * take;
    const paginated = products.slice(start, start + take);

    return {
      api_version: 'torob_api_v3',
      current_page: page,
      total,
      max_pages,
      products: paginated.map((p) => this.mapProduct(p)),
    };
  }

  async getByPageUniques(pageUniques: string[]) {
    if (!Array.isArray(pageUniques) || pageUniques.length === 0) {
      throw new BadRequestException('page_uniques must be a non-empty array');
    }

    const productIds = pageUniques.map((u) => Number(u.split('_')[0]));

    const products = await this.productRepository.findAll({
      where: { id: { in: productIds }, status: ProductStatus.PUBLISHED },
      include: { mainImage: true, categories: true },
    });

    const filtered = products.filter((p) => pageUniques.includes(`${p.id}_0`));

    return {
      api_version: 'torob_api_v3',
      current_page: 1,
      total: filtered.length,
      max_pages: 1,
      products: filtered.map((p) => this.mapProduct(p)),
    };
  }

  async getByPageUrls(urls: string[]) {
    if (!Array.isArray(urls) || urls.length === 0) {
      throw new BadRequestException('page_urls must be a non-empty array');
    }

    const slugs = urls.map((url) => {
      const parts = url.split('/');
      return parts[parts.length - 2];
    });

    const products = await this.productRepository.findAll({
      where: { slug: { in: slugs }, status: ProductStatus.PUBLISHED },
      include: { mainImage: true, categories: true },
    });

    return {
      api_version: 'torob_api_v3',
      current_page: 1,
      total: products.length,
      max_pages: 1,
      products: products.map((p) => this.mapProduct(p)),
    };
  }

  private mapProduct(product: any) {
    const pageUrl = `https://shopinka.ir/product/${product.slug}/`;
    const price = product.salePrice ?? product.basePrice ?? 0;
    const available = (product.quantity ?? 0) > 0;

    return {
      page_unique: `${product.id}`,
      page_url: pageUrl,
      product_group_id: String(product.id),
      title: product.name,
      subtitle: product.shortDescription ?? undefined,
      current_price: available ? price : 0,
      old_price: product.salePrice ? (product.basePrice ?? undefined) : undefined,
      availability: available,
      category_name: product.categories?.[0]?.name ?? undefined,
      image_links: product.mainImage?.fileUrl ? [product.mainImage.fileUrl] : [],
      short_desc: product.shortDescription ?? undefined,
      spec: {},
      guarantee: undefined,
      date_added: product.createdAt.toISOString(),
      date_updated: product.updatedAt.toISOString(),
    };
  }
}
