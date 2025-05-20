import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Blog, Prisma } from 'generated/prisma';
import { BlogMessages } from './enums/blog-messages.enum';

@Injectable()
export class BlogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.BlogCreateArgs): Promise<Blog> {
    return this.prismaService.blog.create(args);
  }

  findAll(args: Prisma.BlogFindManyArgs = {}): Promise<Blog[]> {
    return this.prismaService.blog.findMany(args);
  }

  findOne(args: Prisma.BlogFindFirstArgs): Promise<Blog | null> {
    return this.prismaService.blog.findFirst(args);
  }

  update(args: Prisma.BlogUpdateArgs): Promise<Blog> {
    return this.prismaService.blog.update(args);
  }

  delete(args: Prisma.BlogDeleteArgs): Promise<Blog> {
    return this.prismaService.blog.delete(args);
  }

  async findOneOrThrow(args: Prisma.BlogFindFirstArgs): Promise<Blog | never> {
    const blog = await this.findOne(args);

    if (!blog) throw new NotFoundException(BlogMessages.NotFoundBlog);

    return blog;
  }
}
