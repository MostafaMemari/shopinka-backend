import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { AuthDecorator } from "../../common/decorators/auth.decorator";
import { GetUser } from "../../common/decorators/get-user.decorator";
import { User } from "generated/prisma";
import { QueryOrderDto } from "./dto/query-order.dto";
import { PaginationDto } from "../../common/dtos/pagination.dto";

@Controller('order')
@ApiTags('order')
@AuthDecorator()
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    findAll(@Query() queryOrderDto: QueryOrderDto, @GetUser() user: User) {
        return this.orderService.findAll(user.id, queryOrderDto)
    }

    @Get('item')
    findAllItems(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
        return this.orderService.findAllItems(user.id, paginationDto)
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number, @GetUser() user: User) {
        return this.orderService.findOne(user.id, id)
    }
}