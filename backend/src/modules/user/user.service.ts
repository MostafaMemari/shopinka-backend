import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { QueryUsersDto } from './dto/users-query.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { Prisma, User } from '@prisma/client';

import { AuthService } from '../auth/auth.service';
import { UserMessages } from './enums/user.messages';
import { ChangeRoleDto } from './dto/change-role.dto';
import { FavoriteRepository } from '../product/repositories/favorite.repository';
import { PaginationDto } from '../../common/dtos/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userRepository: UserRepository,

    private readonly authService: AuthService,
  ) {}

  async findAll({ page, take, ...queryUsersDto }: QueryUsersDto) {
    const paginationDto = { page, take };
    const { endDate, fullName, isVerifiedMobile, lastMobileChange, mobile, role, sortBy, sortDirection, startDate } = queryUsersDto;

    const filters: Prisma.UserWhereInput = {};

    if (isVerifiedMobile !== undefined) filters.isVerifiedMobile = isVerifiedMobile;
    if (fullName) filters.fullName = { contains: fullName };
    if (mobile) filters.mobile = { contains: mobile };
    if (role) filters.role = role;
    if (lastMobileChange) filters.lastMobileChange = lastMobileChange;
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const users = await this.userRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
    });

    return { ...pagination(paginationDto, users) };
  }

  async findAllFavorites(userId: number, paginationDto: PaginationDto): Promise<unknown> {
    const favorites = await this.favoriteRepository.findAll({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { product: { select: { id: true, name: true, slug: true, quantity: true, mainImage: { select: { fileUrl: true } } } } },
    });
    return pagination(paginationDto, favorites);
  }

  findOne(id: number): Promise<User | never> {
    return this.userRepository.findOneOrThrow({ where: { id } });
  }

  async update(id: number, { fullName }: UpdateUserDto): Promise<{ message: string; user: User }> {
    await this.userRepository.findOneOrThrow({ where: { id } });

    const updatedUser = await this.userRepository.update({
      where: { id },
      data: {
        fullName,
        updatedAt: new Date(),
      },
    });

    return { message: UserMessages.UpdatedUserSuccess, user: updatedUser };
  }

  // async update(id: number, { fullName, mobile }: UpdateUserDto): Promise<{ message: string; user: User }> {
  //   const existingUser = await this.userRepository.findOne({ where: { OR: [{ mobile }], NOT: { id } } });

  //   if (existingUser) {
  //     throw new ConflictException(UserMessages.AlreadyExistsUser);
  //   }

  //   const currentUser = await this.userRepository.findOneOrThrow({ where: { id } });

  //   const isMobileChanged = mobile && mobile !== currentUser.mobile;

  //   const HOURS_LIMIT = 24;
  //   const timeSinceLastMobileChange = Date.now() - new Date(currentUser.lastMobileChange).getTime();

  //   //* Allow mobile number change only if 24 hours have passed since the last change
  //   if (isMobileChanged && currentUser.lastMobileChange) {
  //     if (timeSinceLastMobileChange < HOURS_LIMIT * 60 * 60 * 1000) {
  //       throw new ForbiddenException(UserMessages.MobileChangeLimit);
  //     }
  //   }

  //   if (isMobileChanged) await this.authService.sendOtp({ mobile });

  //   const updatedUser = await this.userRepository.update({
  //     where: { id },
  //     data: {
  //       fullName,
  //       mobile,
  //       isVerifiedMobile: !isMobileChanged,
  //       perviousMobile: isMobileChanged ? currentUser.mobile : undefined,
  //       updatedAt: new Date(),
  //     },
  //   });

  //   return { message: UserMessages.UpdatedUserSuccess, user: updatedUser };
  // }

  async remove(id: number): Promise<{ message: string; user: User }> {
    await this.userRepository.findOneOrThrow({ where: { id } });

    const removedUser = await this.userRepository.delete({ where: { id } });

    return { message: UserMessages.RemovedUserSuccess, user: removedUser };
  }

  async revertMobile(user: User): Promise<{ message: string }> {
    if (user.isVerifiedMobile && !user.perviousMobile) throw new BadRequestException(UserMessages.MobileVerifiedOrPrevNotFound);

    await this.userRepository.update({
      where: { id: user.id },
      data: {
        isVerifiedMobile: true,
        perviousMobile: null,
        lastMobileChange: null,
        mobile: user.perviousMobile,
        updatedAt: new Date(),
      },
    });

    return { message: UserMessages.RevertedMobileSuccess };
  }

  async changeRole({ role, userId }: ChangeRoleDto) {
    const user = await this.userRepository.findOneOrThrow({ where: { id: userId } });

    if (user.role == role) throw new ConflictException(UserMessages.RoleAlreadyExistsInUser);

    const updatedUser = await this.userRepository.update({ where: { id: userId }, data: { updatedAt: new Date(), role } });

    return { message: UserMessages.ChangedRoleSuccess, user: updatedUser };
  }
}
