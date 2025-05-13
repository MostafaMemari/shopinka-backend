import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "../../../common/decorators/auth.decorator";
import { ShippingInfoService } from "../services/shipping-info.service";
import { Roles } from "../../../common/decorators/role.decorator";
import { Role, User } from "generated/prisma";
import { CreateShippingInfoDto } from "../dto/create-shipping-info.dto";
import { GetUser } from "../../../common/decorators/get-user.decorator";
import { SwaggerConsumes } from "../../../common/enums/swagger-consumes.enum";
import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { UpdateShippingInfoDto } from "../dto/update-shipping-info.dto";

@Controller("shipping-info")
@ApiTags('shipping-info')
@AuthDecorator()
export class ShippingInfoController {
    constructor(private readonly shippingInfoService: ShippingInfoService) { }

    @Post()
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
    create(@Body() createShippingInfoDto: CreateShippingInfoDto, @GetUser() user: User) {
        return this.shippingInfoService.create(user.id, createShippingInfoDto)
    }

    @Get()
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    findAll(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
        return this.shippingInfoService.findAll(user.id, paginationDto)
    }

    @Patch(":id")
    @Roles(Role.ADMIN, Role.SUPER_ADMIN)
    @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateShippingInfoDto: UpdateShippingInfoDto, @GetUser() user: User) {
        return this.shippingInfoService.update(user.id, id, updateShippingInfoDto)
    }
}