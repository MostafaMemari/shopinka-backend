import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AttributeService } from '../services/attribute.service';
import { CreateAttributeDto } from '../dto/create-attribute.dto';
import { UpdateAttributeDto } from '../dto/update-attribute.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role, User } from 'generated/prisma';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';

@Controller('attribute')
@ApiTags('attribute')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class AttributeController {
  constructor(private readonly attributeService: AttributeService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createAttributeDto: CreateAttributeDto, @GetUser() user: User) {
    return this.attributeService.create(user.id, createAttributeDto);
  }

  @Get()
  findAll() {
    return this.attributeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attributeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAttributeDto: UpdateAttributeDto) {
    return this.attributeService.update(+id, updateAttributeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attributeService.remove(+id);
  }
}
