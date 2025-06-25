import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
  Post,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from '..//../common/decorators/role.decorator';
import { Role, User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { QueryUsersDto } from './dto/users-query.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SkipVerifyMobile } from '../../common/decorators/skip-verify-mobile.decorator';
import { ChangeRoleDto } from './dto/change-role.dto';
import { UserMessages } from './enums/user.messages';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Controller('user')
@ApiTags('user')
@AuthDecorator()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findAll(@Query() queryUsersDto: QueryUsersDto) {
    return this.userService.findAll(queryUsersDto);
  }

  @Get('favorites')
  findAllFavorites(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.userService.findAllFavorites(user.id, paginationDto);
  }

  @Post('change-role')
  @Roles(Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  changeRole(@Body() assignRoleDto: ChangeRoleDto, @GetUser() user: User) {
    if (user.id == assignRoleDto.userId) throw new BadRequestException(UserMessages.CannotChangeRole);
    if (user.role == Role.SUPER_ADMIN && assignRoleDto.role == Role.SUPER_ADMIN)
      throw new ForbiddenException(UserMessages.CannotChangeRoleToSuerAdmin);

    return this.userService.changeRole(assignRoleDto);
  }

  @Get('revert-mobile')
  @SkipVerifyMobile()
  revertMobile(@GetUser() user: User) {
    return this.userService.revertMobile(user);
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch('profile')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  remove(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    if (id == user.id) throw new BadRequestException(UserMessages.CannotRemoveYourAccount);

    return this.userService.remove(id);
  }
}
