import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AttributeValueService } from '../services/attribute-value.service';
import { UpdateAttributeValueDto } from '../dto/update-attribute-value.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { Roles } from '../../../common/decorators/role.decorator';
import { Role, User } from 'generated/prisma';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { QueryAttributeValueDto } from '../dto/query-attribute-value.dto';
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto';

@Controller('attribute-value')
@ApiTags('attribute-value')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class AttributeValueController {
  constructor(private readonly attributeValueService: AttributeValueService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createAttributeValueDto: CreateAttributeValueDto) {
    return this.attributeValueService.create(createAttributeValueDto);
  }

  @Get()
  findAll(@Query() queryAttributeValueDto: QueryAttributeValueDto) {
    return this.attributeValueService.findAll(queryAttributeValueDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.attributeValueService.findOne(id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAttributeValueDto: UpdateAttributeValueDto, @GetUser() user: User) {
    return this.attributeValueService.update(user.id, id, updateAttributeValueDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.attributeValueService.remove(user.id, id);
  }
}
