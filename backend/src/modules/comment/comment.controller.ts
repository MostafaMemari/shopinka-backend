import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { QueryCommentDto } from './dto/query-category.dto';
import { Roles } from '../../common/decorators/role.decorator';

@Controller('comment')
@ApiTags('comment')
@AuthDecorator()
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createCommentDto: CreateCommentDto, @GetUser() user: User) {
    return this.commentService.create(user.id, createCommentDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryCommentDto: QueryCommentDto) {
    return this.commentService.findAll(queryCommentDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.findOne(id);
  }

  @Patch('toggle-active/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  toggleActive(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.commentService.toggleActive(user.id, id)
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: UpdateCommentDto, @GetUser() user: User) {
    return this.commentService.update(user.id, id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.commentService.remove(user.id, id);
  }
}
