import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { Comment, Prisma } from 'generated/prisma';
import { CommentMessages } from './enums/comment-messages.enum';
import { QueryCommentDto } from './dto/query-category.dto';
import { sortObject } from '../../common/utils/functions.utils';
import { CacheKeys } from '../../common/enums/cache.enum';
import { CacheService } from '../cache/cache.service';
import { pagination } from '../../common/utils/pagination.utils';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Injectable()
export class CommentService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly productRepository: ProductRepository,
    private readonly cacheService: CacheService
  ) { }
  async create(userId: number, createCommentDto: CreateCommentDto): Promise<{ message: string, comment: Comment }> {
    const { productId, parentId } = createCommentDto

    if (parentId) await this.commentRepository.findOneOrThrow({ where: { id: parentId } })

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId } })

    const newComment = await this.commentRepository.create({ data: { ...createCommentDto, userId, isActive: userId == product.userId } })

    return { message: CommentMessages.CreatedCommentSuccess, comment: newComment }
  }

  async findAll({ take, page, ...queryCommentDto }: QueryCommentDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { endDate, includeUser, sortBy, sortDirection, startDate, includeParent, includeProduct, includeReplies, isRecommended } = queryCommentDto

    const sortedDto = sortObject(queryCommentDto);

    const cacheKey = `${CacheKeys.Comments}_${JSON.stringify(sortedDto)}`;

    const cachedComments = await this.cacheService.get<null | Comment[]>(cacheKey);

    if (cachedComments) return { ...pagination(paginationDto, cachedComments) }

    const filters: Prisma.CommentWhereInput = { isActive: true };

    if (isRecommended !== undefined) filters.isRecommended = isRecommended
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const categories = await this.commentRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { user: includeUser, product: includeProduct, parent: includeParent, replies: includeReplies }
    });

    await this.cacheService.set(cacheKey, categories, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, categories) }
  }

  findOne(id: number): Promise<Comment> {
    return this.getCommentWithAllReplies(id)
  }

  async update(userId: number, commentId: number, updateCommentDto: UpdateCommentDto): Promise<{ message: string, comment: Comment }> {
    const { parentId, productId } = updateCommentDto

    const comment = await this.commentRepository.findOneOrThrow({ where: { id: commentId, userId } })

    if (!comment.isActive) throw new BadRequestException(CommentMessages.InActiveComment)

    if (comment.id === parentId) throw new BadRequestException(CommentMessages.CannotSetItselfAsParent)

    if (await this.isParentIdInReplies(commentId, parentId))
      throw new BadRequestException(CommentMessages.ParentIsChild)


    if (parentId) await this.commentRepository.findOneOrThrow({ where: { id: parentId } })
    if (productId) await this.productRepository.findOneOrThrow({ where: { id: productId } })

    const updatedComment = await this.commentRepository.update({
      where: { id: commentId },
      data: updateCommentDto,
      include: { parent: true, product: true, replies: true }
    })

    return { message: CommentMessages.UpdatedCommentSuccess, comment: updatedComment }
  }

  async remove(userId: number, id: number): Promise<{ message: string, comment: Comment }> {
    const comment = await this.commentRepository.findOneOrThrow({ where: { id: id, userId } })

    if (!comment.isActive) throw new BadRequestException(CommentMessages.InActiveComment)

    const removedComment = await this.commentRepository.delete({ where: { id } })

    return { message: CommentMessages.RemovedCommentSuccess, comment: removedComment }
  }

  async toggleActive(userId: number, commentId: number): Promise<{ message: string, comment: Comment }> {
    let { isActive } = await this.commentRepository.findOneOrThrow({ where: { id: commentId, product: { userId } } })

    isActive ? isActive = false : isActive = true

    const updatedComment = await this.commentRepository.update({ where: { id: commentId }, data: { isActive } })

    return { message: isActive ? CommentMessages.ActiveCommentSuccess : CommentMessages.UnActiveCommentSuccess, comment: updatedComment }
  }

  async findAllUnActive(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const comments = await this.commentRepository.findAll({ where: { isActive: false, product: { userId } } })

    return pagination(paginationDto, comments)
  }

  private async isParentIdInReplies(commentId: number, parentId: number) {
    const queue = [commentId]

    while (queue.length > 0) {
      const currentId = queue.shift()

      const replies = await this.commentRepository.findAll({ where: { parentId: currentId }, select: { id: true } })

      for (const reply of replies) {
        if (reply.id == parentId) return true
        queue.push(reply.id)
      }
    }

    return false
  }

  private async getCommentWithAllReplies(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneOrThrow({
      where: { id: commentId, isActive: true },
      include: {
        parent: true,
        replies: true,
        product: true,
        user: { select: { id: true, fullName: true } }
      }
    })

    comment['replies'] = await Promise.all(
      comment['replies'].map(async rep => this.getCommentWithAllReplies(rep.id))
    )

    return comment
  }
}
