import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactRepository } from './contact.repository';
import { ContactMessage } from '@prisma/client';
import { CacheKeys } from '../../common/enums/cache.enum';
import { CacheService } from '../cache/cache.service';
import { pagination } from '../../common/utils/pagination.utils';
import { ContactMessages } from './enums/contact-messages.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ContactService {
  private readonly CACHE_EXPIRE_TIME: number = 600;

  constructor(
    private readonly cacheService: CacheService,
    private readonly contactRepository: ContactRepository,
  ) {}

  async create(createContactDto: CreateContactDto) {
    const newContact = await this.contactRepository.create({
      data: { ...createContactDto },
    });

    await this.cacheService.del(CacheKeys.Contact);

    return {
      message: ContactMessages.CreatedContactSuccess,
      contact: newContact,
    };
  }

  async findAll({ take, page }: PaginationDto): Promise<unknown> {
    const paginationDto = { take, page };

    const cacheKey = `${CacheKeys.Contact}_${JSON.stringify({ take, page })}`;

    const cachedPages = await this.cacheService.get<null | ContactMessage[]>(cacheKey);

    if (cachedPages) return { ...pagination(paginationDto, cachedPages) };

    const pages = await this.contactRepository.findAll({});

    await this.cacheService.set(cacheKey, pages, this.CACHE_EXPIRE_TIME);

    return { ...pagination(paginationDto, pages) };
  }

  async remove(id: number): Promise<{
    message: string;
    contact: ContactMessage;
  }> {
    await this.contactRepository.findOneOrThrow({ where: { id } });

    const removedContact = await this.contactRepository.delete({ where: { id } });

    await this.cacheService.del(CacheKeys.Contact);

    return {
      message: ContactMessages.RemovedContactSuccess,
      contact: removedContact,
    };
  }
}
