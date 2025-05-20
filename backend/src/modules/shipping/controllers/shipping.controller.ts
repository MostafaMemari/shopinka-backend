import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ShippingService } from '../services/shipping.service';
import { CreateShippingDto } from '../dto/create-shipping.dto';
import { UpdateShippingDto } from '../dto/update-shipping.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { Roles } from '../../../common/decorators/role.decorator';
import { SwaggerConsumes } from '../../../common/enums/swagger-consumes.enum';
import { AuthDecorator } from '../../../common/decorators/auth.decorator';
import { SkipAuth } from '../../../common/decorators/skip-auth.decorator';
import { QueryShippingDto } from '../dto/query-shipping.dto';

@Controller('shipping')
@ApiTags('shipping')
@AuthDecorator()
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createShippingDto: CreateShippingDto, @GetUser() user: User) {
    return this.shippingService.create(user.id, createShippingDto);
  }

  @Get()
  @SkipAuth()
  findAll(@Query() queryShippingDto: QueryShippingDto) {
    return this.shippingService.findAll(queryShippingDto);
  }

  @Get(':id')
  @SkipAuth()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shippingService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateShippingDto: UpdateShippingDto, @GetUser() user: User) {
    return this.shippingService.update(user.id, id, updateShippingDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.shippingService.remove(user.id, id);
  }
}
