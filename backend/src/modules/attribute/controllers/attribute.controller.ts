import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role, User } from 'generated/prisma';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { QueryAttributeDto } from '../dto/query-attribute.dto';

@Controller('attribute')
@ApiTags('attribute')
@AuthDecorator()
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createAttributeDto: CreateAttributeDto, @GetUser() user: User) {
    return this.attributeService.create(user.id, createAttributeDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll(@Query() queryAttributeDto: QueryAttributeDto) {
    return this.attributeService.findAll(queryAttributeDto);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attributeService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAttributeDto: UpdateAttributeDto, @GetUser() user: User) {
    return this.attributeService.update(user.id, id, updateAttributeDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.attributeService.remove(user.id, id);
  }
}
