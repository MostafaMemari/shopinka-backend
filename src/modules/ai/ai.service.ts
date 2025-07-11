import { Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import OpenAI from 'openai';
import { TagRepository } from '../tag/tag.repository';

@Injectable()
export class AiService {
  private openai = new OpenAI({ baseURL: process.env.AI_BASE_URL, apiKey: process.env.AI_API_KEY });

  constructor(private readonly tagRepository: TagRepository) {}

  async create({ message }: CreateAiDto) {
    const completion = await this.openai.chat.completions.create({
      model: 'openai/gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: message,
        },
        {
          role: 'system',
          content: 'تو یک دستیار مخصوص مدیریت تگ‌ها هستی. فقط به درخواست‌های مربوط به ساخت یا مدیریت تگ پاسخ بده.',
        },
      ],
      tools: [
        {
          type: 'function',
          function: {
            name: 'create',
            description: 'ساخت تگ جدید',
            parameters: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'نام تگ مورد نظر',
                },
                slug: {
                  type: 'string',
                  description: 'اسلاگ تگ مورد نظر اگر وارد نکرد یک اسلاگ یونیک جرنیت کن',
                },
              },
              required: ['name', 'slug'],
            },
          },
        },
      ],
      tool_choice: 'auto',
    });

    if (completion.choices[0].message?.tool_calls?.[0]?.function?.name == 'create') {
      const toolCall = completion.choices[0].message.tool_calls[0];
      const parsedArgs = JSON.parse(toolCall.function.arguments);

      const tag = await this.tagRepository.create({ data: { name: parsedArgs.name, slug: parsedArgs.slug } });
      return tag;
    }

    return {
      choices: completion.choices,
      message: completion.choices[0].message,
    };
  }
}
