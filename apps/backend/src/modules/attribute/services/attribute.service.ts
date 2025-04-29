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

    const uniqueSlug = createAttributeDto.slug || await this.generateUniqueSlug(createAttributeDto.name)

    const newAttribute = await this.attributeRepository.create({ data: { ...createAttributeDto, slug: uniqueSlug, userId } })

    return { message: "Created attribute successfully.", attribute: newAttribute }
  }

  findAll() {
    return `This action returns all attribute`;
  }

  findOne(userId: number, attributeId: number): Promise<never | Attribute> {
    return this.attributeRepository.findOneOrThrow({ where: { id: attributeId, OR: [{ userId }, { isPublic: true }] } })
  }

  async update(userId: number, attributeId: number, updateAttributeDto: UpdateAttributeDto): Promise<{ message: string, attribute: Attribute }> {
    await this.attributeRepository.findOneOrThrow({ where: { userId, id: attributeId } })

    if (updateAttributeDto.slug) {
      const existingAttribute = await this.attributeRepository.findOne({ where: { slug: updateAttributeDto.slug } })
      if (existingAttribute) throw new ConflictException("Attribute with this slug already exists.")
    }

    const updatedAttribute = await this.attributeRepository.update({ where: { id: attributeId }, data: updateAttributeDto })

    return { message: "Updated attribute successfully.", attribute: updatedAttribute }
  }

  async remove(userId: number, attributeId: number): Promise<{ message: string, attribute: Attribute }> {
    await this.attributeRepository.findOneOrThrow({ where: { id: attributeId, userId } })

    const removedAttribute = await this.attributeRepository.delete({ where: { id: attributeId } })

    return { message: 'Removed attribute successfully.', attribute: removedAttribute }
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let slug = slugify(name, { locale: 'fa', lower: true, trim: true, strict: true })

    let suffix = 0
    let uniqueSlug = slug

    while (await this.attributeRepository.findOne({ where: { slug: uniqueSlug } })) {
      suffix++
      uniqueSlug = `${slug}-${suffix}`
    }

    return uniqueSlug
  }

}
