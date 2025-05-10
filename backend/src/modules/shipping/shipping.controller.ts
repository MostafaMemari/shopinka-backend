import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { Roles } from 'src/common/decorators/role.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';

@Controller('shipping')
@ApiTags('shipping')
@AuthDecorator()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) { }

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createShippingDto: CreateShippingDto, @GetUser() user: User) {
    return this.shippingService.create(user.id, createShippingDto);
  }

  @Get()
  findAll() {
    return this.shippingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShippingDto: UpdateShippingDto) {
    return this.shippingService.update(+id, updateShippingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingService.remove(+id);
  }
}
