import { AttributeValue, Prisma } from 'generated/prisma';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AttributeValueMessages } from '../enums/attribute-value-messages.enum';

@Injectable()
export class AttributeValueRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.AttributeValueCreateArgs): Promise<AttributeValue> {
    return this.prismaService.attributeValue.create(args);
  }

  findAll(args: Prisma.AttributeValueFindManyArgs = {}): Promise<AttributeValue[]> {
    return this.prismaService.attributeValue.findMany(args);
  }

  findOne(args: Prisma.AttributeValueFindFirstArgs): Promise<AttributeValue | null> {
    return this.prismaService.attributeValue.findFirst(args);
  }

  update(args: Prisma.AttributeValueUpdateArgs): Promise<AttributeValue> {
    return this.prismaService.attributeValue.update(args);
  }

  delete(args: Prisma.AttributeValueDeleteArgs): Promise<AttributeValue> {
    return this.prismaService.attributeValue.delete(args);
  }

  async findOneOrThrow(args: Prisma.AttributeValueFindFirstArgs): Promise<AttributeValue | never> {
    const AttributeValue = await this.findOne(args);

    if (!AttributeValue) throw new NotFoundException(AttributeValueMessages.NotFoundAttributeValue);

    return AttributeValue;
  }
}
