import { Controller, Get, Body, Patch, Param, Delete, Query, ParseIntPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/common/decorators/role.decorator";
import { Role, User } from "generated/prisma";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthDecorator } from "../../common/decorators/auth.decorator";
import { QueryUsersDto } from "./dto/users-query.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SwaggerConsumes } from "../../common/enums/swagger-consumes.enum";
import { GetUser } from "src/common/decorators/get-user.decorator";

@Controller("user")
@ApiTags('user')
@AuthDecorator()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findAll(@Query() queryUsersDto: QueryUsersDto) {
    return this.userService.findAll(queryUsersDto);
  }

  @Get(":id")
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch("profile")
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
