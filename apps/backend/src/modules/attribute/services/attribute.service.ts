import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { AttributeRepository } from '../repositories/attribute.repository';
import { Attribute, Prisma } from 'generated/prisma';
import slugify from 'slugify';

@Injectable()
export class AttributeService {
  constructor(private readonly attributeRepository: AttributeRepository) { }

  async create(userId: number, createAttributeDto: CreateAttributeDto): Promise<{ message: string, attribute: Attribute }> {
    if (createAttributeDto.slug) {
      const existingAttribute = await this.attributeRepository.findOne({ where: { slug: createAttributeDto.slug } })

      if (existingAttribute) throw new ConflictException("Attribute with this slug already exists.")
    }

    let slug = createAttributeDto.slug || slugify(createAttributeDto.name, { locale: 'fa', lower: true, trim: true, strict: true })

    let suffix = 0
    let uniqueSlug = slug

    while (await this.attributeRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++
      uniqueSlug = `${slug}-${suffix}`
    }

    const newAttribute = await this.attributeRepository.create({ data: { ...createAttributeDto, slug: uniqueSlug, userId } })

    return { message: "Created attribute successfully.", attribute: newAttribute }
  }

  findAll() {
    return `This action returns all attribute`;
  }

  findOne(userId: number, attributeId: number): Promise<never | Attribute> {
    return this.attributeRepository.findOneOrThrow({ where: { id: attributeId, OR: [{ userId }, { isPublic: true }] } })
  }

  update(id: number, updateAttributeDto: UpdateAttributeDto) {
    return `This action updates a #${id} attribute`;
  }

  remove(id: number) {
    return `This action removes a #${id} attribute`;
  }
}
