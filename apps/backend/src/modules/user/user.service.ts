import { ConflictException, Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./user.repository";
import { QueryUsersDto } from "./dto/users-query.dto";
import { pagination } from "../../common/utils/pagination.utils";
import { CacheService } from "../cache/cache.service";
import { Prisma, User } from "generated/prisma";
import { sortObject } from "../../common/utils/functions.utils";
import { CacheKeys } from "../../common/enums/cache.enum";

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

  findOne(id: number): Promise<User | never> {
    return this.userRepository.findOneOrThrow({ where: { id } })
  }

  async update(id: number, { fullName, mobile }: UpdateUserDto): Promise<{ message: string, user: User }> {
    const existingUser = await this.userRepository.findOne({ where: { OR: [{ mobile }], NOT: { id } } })

    if (existingUser) {
      throw new ConflictException("User with this mobile already exists.")
    }

    const updatedUser = await this.userRepository.update({ where: { id }, data: { fullName, mobile } })

    return { message: 'Updated user successfully', user: updatedUser }
  }

  async remove(id: number): Promise<{ message: string, user: User }> {
    await this.userRepository.findOneOrThrow({ where: { id } })

    const removedUser = await this.userRepository.delete({ where: { id } })

    return { message: "Removed user successfully", user: removedUser }
  }
}
