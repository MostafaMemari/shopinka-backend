import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactRepository } from './contact.repository';
import { ContactMessage } from '@prisma/client';
import { pagination } from '../../common/utils/pagination.utils';
import { ContactMessages } from './enums/contact-messages.enum';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ContactService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async create(createContactDto: CreateContactDto) {
    const newContact = await this.contactRepository.create({
      data: { ...createContactDto },
    });

    return {
      message: ContactMessages.CreatedContactSuccess,
      contact: newContact,
    };
  }

  async findAll({ take, page }: PaginationDto): Promise<unknown> {
    const paginationDto = { take, page };

    const pages = await this.contactRepository.findAll({});

    return { ...pagination(paginationDto, pages) };
  }

  async remove(id: number): Promise<{
    message: string;
    contact: ContactMessage;
  }> {
    await this.contactRepository.findOneOrThrow({ where: { id } });

    const removedContact = await this.contactRepository.delete({ where: { id } });

    return {
      message: ContactMessages.RemovedContactSuccess,
      contact: removedContact,
    };
  }
}
