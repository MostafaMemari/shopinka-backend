import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role, User } from 'generated/prisma';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';

@Controller('blog')
@ApiTags("blog")
@AuthDecorator()
export class BlogController {
  constructor(private readonly blogService: BlogService) { }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createBlogDto: CreateBlogDto, @GetUser() user: User) {
    return this.blogService.create(user.id, createBlogDto);
  }

  @Get()
  findAll() {
    return this.blogService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBlogDto: UpdateBlogDto, @GetUser() user: User) {
    return this.blogService.update(user.id, id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id);
  }
}
