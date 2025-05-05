import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentRepository } from './comment.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { Comment } from 'generated/prisma';
import { CommentMessages } from './enums/comment-messages.enum';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly productRepository: ProductRepository
  ) { }
  async create(userId: number, createCommentDto: CreateCommentDto): Promise<{ message: string, comment: Comment }> {
    const { productId, parentId } = createCommentDto

    if (parentId) await this.commentRepository.findOneOrThrow({ where: { id: parentId } })

    const product = await this.productRepository.findOneOrThrow({ where: { id: productId } })

    const newComment = await this.commentRepository.create({ data: { ...createCommentDto, userId, isActive: userId == product.userId } })

    return { message: CommentMessages.CreatedCommentSuccess, comment: newComment }
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number): Promise<Comment> {
    return this.getCommentWithAllReplies(id)
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }

  private async isParentIdInReplies(commentId: number, parentId: number) {
    const queue = [commentId]

    while (queue.length > 0) {
      const currentId = queue.shift()

      const replies = await this.commentRepository.findAll({ where: { parentId: currentId }, select: { id: true } })

      for (const child of replies) {
        if (child.id == parentId) return true
        queue.push(child.id)
      }
    }

    return false
  }

  private async getCommentWithAllReplies(commentId: number): Promise<Comment> {
    const comment = await this.commentRepository.findOneOrThrow({
      where: { id: commentId },
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
