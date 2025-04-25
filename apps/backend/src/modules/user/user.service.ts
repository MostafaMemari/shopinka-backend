import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { QueryUsersDto } from "./dto/users-query.dto";
import { pagination } from "../../common/utils/pagination.utils";
import { CacheService } from "../cache/cache.service";
import { Prisma, User } from "generated/prisma";
import { sortObject } from "src/common/utils/functions.utils";
import { CacheKeys } from "src/common/enums/cache.enum";

@Injectable()
export class UserService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService
  ) { }

  async findAll({ page, take, ...queryUsersDto }: QueryUsersDto) {
    const paginationDto = { page, take }
    const { endDate, fullName, isVerifiedMobile, lastMobileChange, mobile, role, sortBy, sortDirection, startDate } = queryUsersDto

    const sortedDto = sortObject(queryUsersDto)

    const cacheKey = `${CacheKeys.Users}_${JSON.stringify(sortedDto)}`

    const usersCache = await this.cacheService.get<User[] | null>(cacheKey)

    if (usersCache) return { ...pagination(paginationDto, usersCache) }

    const filters: Prisma.UserWhereInput = {}

    if (isVerifiedMobile !== undefined) filters.isVerifiedMobile = isVerifiedMobile
    if (fullName) filters.fullName = { contains: fullName, mode: "insensitive" }
    if (mobile) filters.mobile = { contains: mobile, mode: 'insensitive' }
    if (role) filters.role = role
    if (lastMobileChange) filters.lastMobileChange = String(lastMobileChange)
    if (startDate || endDate) {
      filters.createdAt = {}
      if (startDate) filters.createdAt.gte = new Date(startDate)
      if (endDate) filters.createdAt.lte = new Date(endDate)
    }

    const users = await this.userRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' }
    })

    await this.cacheService.set(cacheKey, users, this.CACHE_EXPIRE_TIME)

    return { ...pagination(paginationDto, users) }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
