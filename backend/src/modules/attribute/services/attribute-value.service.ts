import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';
import { AttributeValueRepository } from '../repositories/attribute-value.repository';
import { Attribute, AttributeType, AttributeValue, Prisma } from 'generated/prisma';
import slugify from 'slugify';
import { CacheService } from '../../../modules/cache/cache.service';
import { QueryAttributeValueDto } from '../dto/query-attribute-value.dto';
import { sortObject } from '../../../common/utils/functions.utils';
import { CacheKeys } from '../../../common/enums/cache.enum';
import { pagination } from '../../../common/utils/pagination.utils';
import { AttributeValueMessages } from '../enums/attribute-value-messages.enum';
import { AttributeRepository } from '../repositories/attribute.repository';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';

@Injectable()
export class AttributeValueService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly attributeValueRepository: AttributeValueRepository,
    private readonly attributeRepository: AttributeRepository,
    private readonly cacheService: CacheService
  ) { }

  async create(createAttributeValueDto: CreateAttributeValueDto): Promise<{ message: string, attribute: AttributeValue }> {
    const { attributeId, name, buttonLabel, colorCode, slug } = createAttributeValueDto

    if (slug) {
      const existingAttribute = await this.attributeValueRepository.findOne({ where: { slug } })

      if (existingAttribute) throw new ConflictException(AttributeValueMessages.AlreadyExistsAttributeValue)
    }

    const attribute = await this.attributeRepository.findOneOrThrow({ where: { id: attributeId } })

    if (buttonLabel && colorCode) {
      throw new BadRequestException(AttributeValueMessages.OnlyOneOptionAllowed)
    }

    if (attribute.type == AttributeType.COLOR && !colorCode) {
      throw new BadRequestException(AttributeValueMessages.ColorCodeRequired)
    }

    if (attribute.type == AttributeType.BUTTON && !buttonLabel) {
      throw new BadRequestException(AttributeValueMessages.ButtonLabelRequired)
    }

    const uniqueSlug = slug || await this.generateUniqueSlug(name)

    const newAttribute = await this.attributeValueRepository.create({ data: { ...createAttributeValueDto, slug: uniqueSlug } })

    return { message: AttributeValueMessages.CreatedAttributeValueSuccess, attribute: newAttribute }
  }

  async findAll({ page, take, ...queryAttributeValueDto }: QueryAttributeValueDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { name, slug, sortBy, sortDirection, startDate, attributeId, buttonLabel, colorCode, endDate, includeAttribute } = queryAttributeValueDto

    const sortedDto = sortObject(queryAttributeValueDto);

    const cacheKey = `${CacheKeys.AttributeValues}_${JSON.stringify(sortedDto)}`;

    const cachedAttributes = await this.cacheService.get<null | Attribute[]>(cacheKey);

    if (cachedAttributes) return { ...pagination(paginationDto, cachedAttributes) }

    const filters: Prisma.AttributeValueWhereInput = {};

    if (colorCode) filters.colorCode = { contains: colorCode, mode: "insensitive" };
    if (buttonLabel) filters.buttonLabel = { contains: buttonLabel, mode: "insensitive" };
    if (name) filters.name = { contains: name, mode: "insensitive" };
    if (slug) filters.slug = { contains: slug, mode: "insensitive" };
    if (attributeId) filters.attributeId = attributeId
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const attributes = await this.attributeValueRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { attribute: includeAttribute }
    });

    await this.cacheService.set(cacheKey, attributes, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, attributes) }
  }

  findOne(attributeId: number): Promise<never | AttributeValue> {
    return this.attributeValueRepository.findOneOrThrow({ where: { id: attributeId }, include: { attribute: true } })
  }

  async update(userId: number, attributeValueId: number, updateAttributeValueDto: UpdateAttributeValueDto): Promise<{ message: string, attributeValue: AttributeValue }> {
    const { buttonLabel, colorCode, slug } = updateAttributeValueDto

    await this.attributeValueRepository.findOneOrThrow({ where: { attribute: { userId }, id: attributeValueId } })

    if (slug) {
      const existingAttributeValue = await this.attributeValueRepository.findOne({ where: { slug, id: { not: attributeValueId } } })
      if (existingAttributeValue) throw new ConflictException(AttributeValueMessages.AlreadyExistsAttributeValue)
    }

    const attribute = await this.attributeRepository.findOneOrThrow({ where: { values: { some: { id: attributeValueId } } } })

    if (buttonLabel && colorCode) {
      throw new BadRequestException(AttributeValueMessages.OnlyOneOptionAllowed)
    }

    if (colorCode && attribute.type !== AttributeType.COLOR) {
      throw new BadRequestException(AttributeValueMessages.ColorCodeNotAllowed)
    }

    if (buttonLabel && attribute.type !== AttributeType.BUTTON) {
      throw new BadRequestException(AttributeValueMessages.ButtonLabelNotAllowed)
    }

    const updatedAttributeValue = await this.attributeValueRepository.update({ where: { id: attributeValueId }, data: updateAttributeValueDto })

    return { message: AttributeValueMessages.UpdatedAttributeValueSuccess, attributeValue: updatedAttributeValue }
  }

  async remove(userId: number, attributeId: number): Promise<{ message: string, attributeValue: AttributeValue }> {
    await this.attributeValueRepository.findOneOrThrow({ where: { id: attributeId, attribute: { userId } } })

    const removedAttribute = await this.attributeValueRepository.delete({ where: { id: attributeId } })

    return { message: AttributeValueMessages.RemovedAttributeValueSuccess, attributeValue: removedAttribute }
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, trim: true, strict: true })

    let suffix = 0
    let uniqueSlug = slug

    while (await this.attributeValueRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++
      uniqueSlug = `${slug}-${suffix}`
    }

    return uniqueSlug
  }

}
