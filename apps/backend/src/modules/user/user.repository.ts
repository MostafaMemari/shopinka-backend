import { Prisma, User } from "generated/prisma";
import { PrismaService } from "../prisma/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(data: Prisma.UserCreateInput, args: Omit<Prisma.UserCreateArgs, "data"> = {}): Promise<User> {
        return this.prismaService.user.create({ data, ...args });
    }

    count(): Promise<number> {
        return this.prismaService.user.count()
    }

    findAll(args: Prisma.UserFindManyArgs = {}): Promise<User[]> {
        return this.prismaService.user.findMany(args)
    }

    findOne(args: Prisma.UserFindFirstArgs): Promise<User | null> {
        return this.prismaService.user.findFirst(args)
    }

    update(args: Prisma.UserUpdateArgs): Promise<User> {
        return this.prismaService.user.update(args)
    }

    delete(args: Prisma.UserDeleteArgs): Promise<User> {
        return this.prismaService.user.delete(args)
    }

    async findOneOrThrow(args: Prisma.UserFindFirstArgs): Promise<User | never> {
        const user = await this.findOne(args)

        if (!user) throw new NotFoundException('User not found')

        return user
    }
}