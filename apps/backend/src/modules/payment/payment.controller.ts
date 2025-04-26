import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { User } from 'generated/prisma';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { PaymentDto } from './dto/payment.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { lastValueFrom, timeout } from 'rxjs';
import { RefundPaymentDto } from './dto/refund.dto';

@Controller('payment')
@ApiTags('payment')
@AuthDecorator()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  gatewayUrl(@Body() paymentDto: PaymentDto, @GetUser() user: User) {
    return this.paymentService.getGatewayUrl({ ...paymentDto, user, userId: user.id })
  }

  @Get('verify')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async verifyPayment(@Query('Authority') authority: string, @Query('Status') status: string) {
    return this.paymentService.verify({ authority, status })
  }

  @Post('refund/:transactionId')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  refundPayment(@Param('transactionId', ParseIntPipe) transactionId: number, @Body() refundPaymentDto: RefundPaymentDto) {
    return this.paymentService.refund(transactionId, refundPaymentDto)
  }
}
