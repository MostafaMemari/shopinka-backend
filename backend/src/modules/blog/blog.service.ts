import { ConflictException, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogRepository } from './blog.repository';
import { Blog } from 'generated/prisma';
import { BlogMessages } from './enums/blog-messages.enum';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class BlogService {
  private readonly CACHE_EXPIRE_TIME: number = 600 //* 5 minutes

  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async create(userId: number, createBlogDto: CreateBlogDto): Promise<{ message: string, blog: Blog }> {
    const { title, categoryIds, slug, tagIds } = createBlogDto

    if (slug) {
      const existingBlog = await this.blogRepository.findOne({ where: { slug } })
      if (existingBlog) throw new ConflictException(BlogMessages.AlreadyExistsBlog)
    }

    const categories = categoryIds ? await this.categoryRepository.findAll({ where: { id: { in: categoryIds } } }) : []
    //TODO: Add find all tags
    const tags = []
    const uniqueSlug = slug ?? await this.generateUniqueSlug(title)

    categoryIds && delete createBlogDto.categoryIds
    tagIds && delete createBlogDto.tagIds

    const newBlog = await this.blogRepository.create({
      data: {
        ...createBlogDto,
        userId,
        slug: uniqueSlug,
        categories: { connect: categories.map(c => ({ id: c.id })) },
        tags: { connect: tags.map(t => ({ id: t.id })) },
        //TODO: Calculate reading time
      }
    })

    return { message: BlogMessages.CreatedBlogSuccess, blog: newBlog }
  }

  findAll() {
    return `This action returns all blog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blog`;
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`;
  }

  remove(id: number) {
    return `This action removes a #${id} blog`;
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    let suffix = 0
    let slug = name

    while (await this.blogRepository.findOne({ where: { slug } })) {
      suffix++
      slug = `${name}-${suffix}`
    }

    return slug
  }

}
