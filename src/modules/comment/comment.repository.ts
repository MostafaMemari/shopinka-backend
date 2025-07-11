import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment, Prisma } from '@prisma/client';
import { CommentMessages } from './enums/comment-messages.enum';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.CommentCreateArgs): Promise<Comment> {
    return this.prismaService.comment.create(args);
  }

  findAll(args: Prisma.CommentFindManyArgs = {}): Promise<Comment[]> {
    return this.prismaService.comment.findMany(args);
  }

  findOne(args: Prisma.CommentFindFirstArgs): Promise<Comment | null> {
    return this.prismaService.comment.findFirst(args);
  }

  update(args: Prisma.CommentUpdateArgs): Promise<Comment> {
    return this.prismaService.comment.update(args);
  }

  delete(args: Prisma.CommentDeleteArgs): Promise<Comment> {
    return this.prismaService.comment.delete(args);
  }

  async findOneOrThrow(args: Prisma.CommentFindFirstArgs): Promise<Comment | never> {
    const comment = await this.findOne(args);

    if (!comment) throw new NotFoundException(CommentMessages.NotFoundComment);

    return comment;
  }
}
