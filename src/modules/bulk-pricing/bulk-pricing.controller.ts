import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BulkPricingService } from './bulk-pricing.service';
import { CreateBulkPricingDto } from './dto/create-bulk-pricing.dto';
import { UpdateBulkPricingDto } from './dto/update-bulk-pricing.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role, User } from '@prisma/client';
import { GetUser } from 'src/common/decorators/get-user.decorator';

@Controller('bulk-pricing')
@ApiTags('bulk-pricing')
@AuthDecorator()
export class BulkPricingController {
  constructor(private readonly bulkPricingService: BulkPricingService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  create(@Body() createBulkPricingDto: CreateBulkPricingDto, @GetUser() user: User) {
    return this.bulkPricingService.create(user.id, createBulkPricingDto);
  }

  @Get()
  findAll() {
    return this.bulkPricingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bulkPricingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBulkPricingDto: UpdateBulkPricingDto) {
    return this.bulkPricingService.update(+id, updateBulkPricingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bulkPricingService.remove(+id);
  }
}
