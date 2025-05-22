import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { User } from '@prisma/client';
import { QueryAddressDto } from './dto/query-address.dto';

@Controller('address')
@ApiTags('address')
@AuthDecorator()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  create(@Body() createAddressDto: CreateAddressDto, @GetUser() user: User) {
    return this.addressService.create(user.id, createAddressDto);
  }

  @Get()
  findAll(@Query() queryAddressDto: QueryAddressDto, @GetUser() user: User) {
    return this.addressService.findAll(user.id, queryAddressDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.addressService.findOne(user.id, id);
  }

  @Patch(':id')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAddressDto: UpdateAddressDto, @GetUser() user: User) {
    return this.addressService.update(user.id, id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.addressService.remove(user.id, id);
  }
}
