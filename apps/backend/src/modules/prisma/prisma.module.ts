import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CacheModule } from '../cache/cache.module';

@Global()
@Module({
    imports: [CacheModule],
    controllers: [],
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule { }
