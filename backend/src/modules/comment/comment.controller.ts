import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from 'generated/prisma';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';

@Controller('comment')
@ApiTags('comment')
@AuthDecorator()
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @SkipAuth()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    return this.commentService.create(1, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.commentService.remove(user.id, id);
  }
}
