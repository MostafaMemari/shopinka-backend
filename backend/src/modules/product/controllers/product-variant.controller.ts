import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { AuthDecorator } from "../../../common/decorators/auth.decorator";
import { ProductVariantService } from "../services/product-variant.service";
import { CreateProductVariantDto } from "../dto/create-product-variant.dto";
import { GetUser } from "../../../common/decorators/get-user.decorator";
import { Role, User } from "generated/prisma";
import { Roles } from "../../../common/decorators/role.decorator";
import { SwaggerConsumes } from "../../../common/enums/swagger-consumes.enum";
import { SkipAuth } from "../../../common/decorators/skip-auth.decorator";
import { UpdateProductVariantDto } from "../dto/update-product-variant.dto";

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

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.productVariantService.findOne(id);
    }

    @Patch(':id')
    @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
    update(@Param('id', ParseIntPipe) id: number, @Body() updateProductVariantDto: UpdateProductVariantDto, @GetUser() user: User) {
        return this.productVariantService.update(user.id, id, updateProductVariantDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
        return this.productVariantService.remove(user.id, id);
    }
}