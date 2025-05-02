import { Body, Controller, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "../../../common/decorators/auth.decorator";
import { ProductVariantService } from "../services/product-variant.service";
import { CreateProductVariantDto } from "../dto/create-product-variant.dto";
import { GetUser } from "../../../common/decorators/get-user.decorator";
import { Role, User } from "generated/prisma";
import { Roles } from "../../../common/decorators/role.decorator";
import { SwaggerConsumes } from "../../../common/enums/swagger-consumes.enum";

@Controller('product-variant')
@ApiTags('product-variant')
@AuthDecorator()
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
export class ProductVariantController {
    constructor(private readonly productVariantService: ProductVariantService) { }

    @Post()
    @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
    create(@Body() createProductVariantDto: CreateProductVariantDto, @GetUser() user: User) {
        return this.productVariantService.create(user.id, createProductVariantDto)
    }
}