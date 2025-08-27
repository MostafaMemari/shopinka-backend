import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BulkPricingService } from './bulk-pricing.service';
import { CreateBulkPricingDto } from './dto/create-bulk-pricing.dto';
import { UpdateBulkPricingDto } from './dto/update-bulk-pricing.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../../common/decorators/auth.decorator';

@Controller('bulk-pricing')
@ApiTags('bulk-pricing')
@AuthDecorator()
export class BulkPricingController {
  constructor(private readonly bulkPricingService: BulkPricingService) {}

  @Post()
  create(@Body() createBulkPricingDto: CreateBulkPricingDto) {
    return this.bulkPricingService.create(createBulkPricingDto);
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
