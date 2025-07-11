import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { AttributeRepository } from '../repositories/attribute.repository';
import { Attribute, Prisma } from '@prisma/client';
import slugify from 'slugify';
import { QueryAttributeDto } from '../dto/query-attribute.dto';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { pagination } from '../../../common/utils/pagination.utils';
import { AttributeMessages } from '../enums/attribute-messages.enum';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeRepository: AttributeRepository) {}

  async create(userId: number, createAttributeDto: CreateAttributeDto): Promise<{ message: string; attribute: Attribute }> {
    if (createAttributeDto.slug) {
      const existingAttribute = await this.attributeRepository.findOne({ where: { slug: createAttributeDto.slug } });

      if (existingAttribute) throw new ConflictException(AttributeMessages.AlreadyExistsAttribute);
    }

    const uniqueSlug = createAttributeDto.slug || (await this.generateUniqueSlug(createAttributeDto.name));

    const newAttribute = await this.attributeRepository.create({ data: { ...createAttributeDto, slug: uniqueSlug, userId } });

    return { message: AttributeMessages.CreatedAttributeSuccess, attribute: newAttribute };
  }

  async findAll({ page, take, ...queryAttributeDto }: QueryAttributeDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { description, endDate, includeUser, includeValues, name, slug, sortBy, sortDirection, startDate, type, userId } =
      queryAttributeDto;

    const sortedDto = sortObject(queryAttributeDto);

    const cacheKey = `${CacheKeys.Attributes}_${JSON.stringify(sortedDto)}`;

    const filters: Prisma.AttributeWhereInput = {};

    if (description) filters.description = { contains: description };
    if (name) filters.name = { contains: name };
    if (slug) filters.slug = { contains: slug };
    if (userId) filters.userId = userId;
    if (type) filters.type = type;
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const attributes = await this.attributeRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { user: includeUser, values: includeValues },
    });

    return { ...pagination(paginationDto, attributes) };
  }

  findOne(attributeId: number): Promise<never | Attribute> {
    return this.attributeRepository.findOneOrThrow({ where: { id: attributeId }, include: { values: true, user: true } });
  }

  async update(
    userId: number,
    attributeId: number,
    updateAttributeDto: UpdateAttributeDto,
  ): Promise<{ message: string; attribute: Attribute }> {
    await this.attributeRepository.findOneOrThrow({ where: { userId, id: attributeId } });

    if (updateAttributeDto.slug) {
      const existingAttribute = await this.attributeRepository.findOne({ where: { slug: updateAttributeDto.slug } });
      if (existingAttribute) throw new ConflictException(AttributeMessages.AlreadyExistsAttribute);
    }

    const updatedAttribute = await this.attributeRepository.update({ where: { id: attributeId }, data: updateAttributeDto });

    return { message: AttributeMessages.UpdatedAttributeSuccess, attribute: updatedAttribute };
  }

  async remove(userId: number, attributeId: number): Promise<{ message: string; attribute: Attribute }> {
    await this.attributeRepository.findOneOrThrow({ where: { id: attributeId, userId } });

    const removedAttribute = await this.attributeRepository.delete({ where: { id: attributeId } });

    return { message: AttributeMessages.RemovedAttributeSuccess, attribute: removedAttribute };
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, trim: true, strict: true });

    let suffix = 0;
    let uniqueSlug = slug;

    while (await this.attributeRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++;
      uniqueSlug = `${slug}-${suffix}`;
    }

    return uniqueSlug;
  }
}
