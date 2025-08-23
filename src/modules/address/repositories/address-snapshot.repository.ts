import { AddressSnapshot, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressSnapshotRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(args: Prisma.AddressSnapshotCreateArgs): Promise<AddressSnapshot> {
    return this.prismaService.addressSnapshot.create(args);
  }

  findAll(args: Prisma.AddressSnapshotFindManyArgs = {}): Promise<AddressSnapshot[]> {
    return this.prismaService.addressSnapshot.findMany(args);
  }

  findOne(args: Prisma.AddressSnapshotFindFirstArgs): Promise<AddressSnapshot | null> {
    return this.prismaService.addressSnapshot.findFirst(args);
  }

  update(args: Prisma.AddressSnapshotUpdateArgs): Promise<AddressSnapshot> {
    return this.prismaService.addressSnapshot.update(args);
  }

  delete(args: Prisma.AddressSnapshotDeleteArgs): Promise<AddressSnapshot> {
    return this.prismaService.addressSnapshot.delete(args);
  }
}
