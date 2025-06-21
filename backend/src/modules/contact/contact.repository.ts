import { ContactMessage, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ContactMessages } from './enums/contact-messages.enum';

@Injectable()
export class ContactRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.ContactMessageCreateArgs): Promise<ContactMessage> {
    return this.prismaService.contactMessage.create(args);
  }

  findAll(args: Prisma.ContactMessageFindManyArgs = {}): Promise<ContactMessage[]> {
    return this.prismaService.contactMessage.findMany(args);
  }

  findOne(args: Prisma.ContactMessageFindFirstArgs): Promise<ContactMessage | null> {
    return this.prismaService.contactMessage.findFirst(args);
  }

  update(args: Prisma.ContactMessageUpdateArgs): Promise<ContactMessage> {
    return this.prismaService.contactMessage.update(args);
  }

  delete(args: Prisma.ContactMessageDeleteArgs): Promise<ContactMessage> {
    return this.prismaService.contactMessage.delete(args);
  }

  async findOneOrThrow(args: Prisma.ContactMessageFindFirstArgs): Promise<ContactMessage | never> {
    const contact = await this.findOne(args);

    if (!contact) throw new NotFoundException(ContactMessages.NotFoundContact);

    return contact;
  }
}
