import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from 'generated/prisma';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { SkipAuth } from '../../common/decorators/skip-auth.decorator';

@Controller('category')
@ApiTags('category')
@AuthDecorator()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  @SkipAuth()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createCategoryDto: CreateCategoryDto, @GetUser() user: User) {
    return this.categoryService.create(1, createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  @SkipAuth()
  update(@Param('id', ParseIntPipe) id: number, @Body() updateCategoryDto: UpdateCategoryDto, @GetUser() user: User) {
    return this.categoryService.update(1, id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
