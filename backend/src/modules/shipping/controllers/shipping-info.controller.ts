import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "src/common/decorators/auth.decorator";
import { ShippingInfoService } from "../services/shipping-info.service";
import { Roles } from "src/common/decorators/role.decorator";
import { Role, User } from "generated/prisma";
import { CreateShippingInfoDto } from "../dto/create-shipping-info.dto";
import { GetUser } from "src/common/decorators/get-user.decorator";

@Controller("shipping-info")
@ApiTags('shipping-info')
@AuthDecorator()
export class ShippingInfoController {
    constructor(private readonly shippingInfoService: ShippingInfoService) { }

    @Post()
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    create(@Body() createShippingInfoDto: CreateShippingInfoDto, @GetUser() user: User) {
        return this.shippingInfoService.create(user.id , createShippingInfoDto)
    }
}