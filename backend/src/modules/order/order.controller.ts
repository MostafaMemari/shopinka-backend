import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { AuthDecorator } from "../../common/decorators/auth.decorator";
import { GetUser } from "../../common/decorators/get-user.decorator";
import { User } from "generated/prisma";
import { SkipAuth } from "../../common/decorators/skip-auth.decorator";
import { QueryOrderDto } from "./dto/query-order.dto";

@Controller('order')
@ApiTags('order')
@AuthDecorator()
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    @SkipAuth()
    findAll(@Query() queryOrderDto: QueryOrderDto, @GetUser() user: User) {
        return this.orderService.findAll(1, queryOrderDto)
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number, @GetUser() user: User) {
        return this.orderService.findOne(user.id, id)
    }
}