import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Page, Prisma } from '@prisma/client';
import { PageMessages } from './enums/page-messages.enum';

@Injectable()
export class PageRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.PageCreateArgs): Promise<Page> {
    return this.prismaService.page.create(args);
  }

  findAll(args: Prisma.PageFindManyArgs = {}): Promise<Page[]> {
    return this.prismaService.page.findMany(args);
  }

  findOne(args: Prisma.PageFindFirstArgs): Promise<Page | null> {
    return this.prismaService.page.findFirst(args);
  }

  update(args: Prisma.PageUpdateArgs): Promise<Page> {
    return this.prismaService.page.update(args);
  }

  delete(args: Prisma.PageDeleteArgs): Promise<Page> {
    return this.prismaService.page.delete(args);
  }

  async findOneOrThrow(args: Prisma.PageFindFirstArgs): Promise<Page | never> {
    const page = await this.findOne(args);

    if (!page) throw new NotFoundException(PageMessages.NotFoundPage);

    return page;
  }
}
