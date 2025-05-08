import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { AuthDecorator } from "../../common/decorators/auth.decorator";
import { GetUser } from "../../common/decorators/get-user.decorator";
import { User } from "generated/prisma";
import { SkipAuth } from "../../common/decorators/skip-auth.decorator";

@Controller('order')
@ApiTags('order')
@AuthDecorator()
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get(":id")
    @SkipAuth()
    findOne(@Param("id", ParseIntPipe) id: number, @GetUser() user: User) {
        return this.orderService.findOne(1, id)
    }
}