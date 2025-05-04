import { Injectable } from "@nestjs/common";
import { Favorite, Prisma } from "generated/prisma";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class FavoriteRepository {
    constructor(private readonly prismaService: PrismaService) { }

    create(args: Prisma.FavoriteCreateArgs): Promise<Favorite> {
        return this.prismaService.favorite.create(args)
    }

    findOne(args: Prisma.FavoriteFindFirstArgs): Promise<Favorite> {
        return this.prismaService.favorite.findFirst(args)
    }

    findAll(args: Prisma.FavoriteFindManyArgs): Promise<Favorite[]> {
        return this.prismaService.favorite.findMany(args)
    }

    delete(args: Prisma.FavoriteDeleteArgs): Promise<Favorite> {
        return this.prismaService.favorite.delete(args)
    }
}