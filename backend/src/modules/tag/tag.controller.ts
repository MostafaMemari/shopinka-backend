import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { Roles } from '../../common/decorators/role.decorator';
import { Role, User } from 'generated/prisma';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';

@Controller('tag')
@ApiTags('tag')
@AuthDecorator()
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createTagDto: CreateTagDto, @GetUser() user: User) {
    return this.tagService.create(user.id, createTagDto);
  }

  @Get()
  findAll() {
    return this.tagService.findAll();
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagService.update(+id, updateTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagService.remove(+id);
  }
}
