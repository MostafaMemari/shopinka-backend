import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { Comment, Prisma } from '@prisma/client';
import { CommentMessages } from './enums/comment-messages.enum';
import { QueryCommentDto } from './dto/query-comment.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { QueryAdminCommentDto } from './dto/query-admin-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  async create(userId: number, createCommentDto: CreateCommentDto): Promise<{ message: string; comment: Comment }> {
    const { productId, parentId } = createCommentDto;

    if (parentId) await this.commentRepository.findOneOrThrow({ where: { id: parentId } });

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId } });

    const newComment = await this.commentRepository.create({ data: { ...createCommentDto, userId, isActive: userId == product.userId } });

    return { message: CommentMessages.CreatedCommentSuccess, comment: newComment };
  }

  async findAll({ take, page, ...queryCommentDto }: QueryCommentDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { includeUser, includeReplies, isRecommended, repliesDepth, blogId, productId } = queryCommentDto;

    const filters: Prisma.CommentWhereInput = { isActive: true, parent: null };

    if (isRecommended !== undefined) filters.isRecommended = isRecommended;
    if (blogId) filters.blogId = blogId;
    if (productId) filters.productId = productId;

    const include: Prisma.CommentInclude = {
      user: includeUser && { select: { id: true, fullName: true } },
      replies: includeReplies,
    };

    const comments = await this.commentRepository.findAll({
      where: filters,
      orderBy: { createdAt: 'desc' },
      include,
    });

    let resultComments = comments;
    if (includeReplies && repliesDepth > 0) {
      resultComments = await Promise.all(comments.map(async (comment) => await this.loadReplies(comment.id, include, repliesDepth)));
    }

    return { ...pagination(paginationDto, resultComments) };
  }

  findOne(id: number): Promise<Comment> {
    return this.loadReplies(
      id,
      { blog: true, parent: true, product: true, replies: true, user: { select: { id: true, fullName: true } } },
      Infinity,
    );
  }

  async update(userId: number, commentId: number, updateCommentDto: UpdateCommentDto): Promise<{ message: string; comment: Comment }> {
    const { parentId, productId } = updateCommentDto;

    const comment = await this.commentRepository.findOneOrThrow({ where: { id: commentId, userId } });

    if (!comment.isActive) throw new BadRequestException(CommentMessages.InActiveComment);

    if (comment.id === parentId) throw new BadRequestException(CommentMessages.CannotSetItselfAsParent);

    if (await this.isParentIdInReplies(commentId, parentId)) throw new BadRequestException(CommentMessages.ParentIsChild);

    if (parentId) await this.commentRepository.findOneOrThrow({ where: { id: parentId } });
    if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } });

    const updatedComment = await this.commentRepository.update({
      where: { id: commentId },
      data: updateCommentDto,
      include: { parent: true, product: true, replies: true },
    });

    return { message: CommentMessages.UpdatedCommentSuccess, comment: updatedComment };
  }

  async remove(userId: number, id: number): Promise<{ message: string; comment: Comment }> {
    const comment = await this.commentRepository.findOneOrThrow({ where: { id: id, userId } });

    if (!comment.isActive) throw new BadRequestException(CommentMessages.InActiveComment);

    const removedComment = await this.commentRepository.delete({ where: { id } });

    return { message: CommentMessages.RemovedCommentSuccess, comment: removedComment };
  }

  async toggleActive(userId: number, commentId: number): Promise<{ message: string; comment: Comment }> {
    let { isActive } = await this.commentRepository.findOneOrThrow({ where: { id: commentId, product: { userId } } });

    isActive ? (isActive = false) : (isActive = true);

    const updatedComment = await this.commentRepository.update({ where: { id: commentId }, data: { isActive } });

    return { message: isActive ? CommentMessages.ActiveCommentSuccess : CommentMessages.UnActiveCommentSuccess, comment: updatedComment };
  }

  async findAllForAdmins(userId: number, { page, take, ...queryCommentDto }: QueryAdminCommentDto): Promise<unknown> {
    const paginationDto = { page, take };
    const {
      includeUser,
      includeParent,
      includeProduct,
      includeReplies,
      isRecommended,
      includeBlog,
      repliesDepth,
      blogId,
      productId,
      endDate,
      isActive,
      sortBy,
      sortDirection,
      startDate,
    } = queryCommentDto;

    const filters: Prisma.CommentWhereInput = { isActive, parent: null };

    if (isRecommended !== undefined) filters.isRecommended = isRecommended;
    if (blogId) filters.blog = { userId, id: blogId };
    if (productId) filters.product = { userId, id: productId };
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const include: Prisma.CommentInclude = {
      user: includeUser,
      parent: includeParent,
      blog: includeBlog,
      product: includeProduct,
      replies: includeReplies,
    };

    const comments = await this.commentRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include,
    });

    let resultComments = comments;
    if (includeReplies && repliesDepth > 0) {
      resultComments = await Promise.all(comments.map(async (comment) => await this.loadReplies(comment.id, include, repliesDepth)));
    }

    return { ...pagination(paginationDto, resultComments) };
  }

  private async isParentIdInReplies(commentId: number, parentId: number) {
    const queue = [commentId];

    while (queue.length > 0) {
      const currentId = queue.shift();

      const replies = await this.commentRepository.findAll({ where: { parentId: currentId }, select: { id: true } });

      for (const reply of replies) {
        if (reply.id == parentId) return true;
        queue.push(reply.id);
      }
    }

    return false;
  }

  private async loadReplies(commentId: number, include: Prisma.CommentInclude, depth: number): Promise<Comment> {
    if (depth <= 0) this.commentRepository.findOneOrThrow({ where: { id: commentId }, include });

    const comment = await this.commentRepository.findOneOrThrow({
      where: { id: commentId },
      include: {
        ...include,
        replies: true,
      },
    });

    if (comment['replies'] && comment['replies'].length > 0) {
      comment['replies'] = await Promise.all(comment['replies'].map((child) => this.loadReplies(child.id, include, depth - 1)));
    }

    return comment;
  }
}
