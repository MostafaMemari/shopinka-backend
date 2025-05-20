import { Body, Controller, Get, Param, ParseIntPipe, Patch, Query } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { Role, User } from 'generated/prisma';
import { QueryOrderDto } from './dto/query-order.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { Roles } from '../../common/decorators/role.decorator';
import { UpdateOrderStatusDto } from './dto/update-status-order.dto';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';

@Controller('order')
@ApiTags('order')
@AuthDecorator()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllForAdmin(@Query() queryOrderDto: QueryOrderDto, @GetUser() user: User) {
    return this.orderService.findAllForAdmin(user.id, queryOrderDto);
  }

  @Get('my')
  findAllForUser(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.orderService.findAllForUser(user.id, paginationDto);
  }

  @Get('item')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAllItemsForAdmin(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.orderService.findAllItemsForAdmin(user.id, paginationDto);
  }

  @Get('my/item')
  findAllItemsForUser(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.orderService.findAllItemsForUser(user.id, paginationDto);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findOneForAdmin(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.orderService.findOneForAdmin(user.id, id);
  }

  @Get('my/:id')
  findOneForUser(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.orderService.findOneForUser(user.id, id);
  }

  @Patch('status/:id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() updateOrderStatusDto: UpdateOrderStatusDto, @GetUser() user: User) {
    return this.orderService.updateStatus(user.id, id, updateOrderStatusDto);
  }
}
