import { Controller, Get, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { Roles } from "src/common/decorators/role.decorator";
import { Role } from "generated/prisma";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthDecorator } from "../../common/decorators/auth.decorator";
import { QueryUsersDto } from "./dto/users-query.dto";

@Controller("user")
@AuthDecorator()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findAll(@Query() queryUsersDto: QueryUsersDto) {
    return this.userService.findAll(queryUsersDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
