import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TorobGuard } from './guards/torob.guard';
import { TorobService } from './torob.service';
import { TorobProductsRequestDto } from './dto/torob.dto';

@Controller('torob_api/v3')
export class TorobController {
  constructor(private readonly torobService: TorobService) {}

  @Post('products')
  // @UseGuards(TorobGuard)
  async getProducts(@Body() body: TorobProductsRequestDto) {
    return this.torobService.handleRequest(body);
  }
}
