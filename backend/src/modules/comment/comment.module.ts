import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthService } from '../auth/auth.service';
import { UserRepository } from '../user/user.repository';
import { CommentRepository } from './comment.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { CacheService } from '../cache/cache.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService, AuthService, UserRepository, CommentRepository, ProductRepository, CacheService],
})
export class CommentModule {}
