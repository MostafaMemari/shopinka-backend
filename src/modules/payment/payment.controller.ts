import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Res } from '@nestjs/common';
import { PaymentRedirectResult, PaymentService } from './payment.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role, User } from '@prisma/client';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { PaymentDto } from './dto/payment.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { RefundPaymentDto } from './dto/refund.dto';
import { QueryMyTransactionsDto } from './dto/user-transactions-query.dto';
import { Roles } from '../../common/decorators/role.decorator';
import { QueryTransactionsDto } from './dto/transactions-query.dto';
import { RetryPaymentDto } from './dto/retry-payment.dto';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { Response } from 'express';

@Controller('payment')
@ApiTags('payment')
@AuthDecorator()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  gatewayUrl(@Body() paymentDto: PaymentDto, @GetUser() user: User) {
    return this.paymentService.getGatewayUrl(user, paymentDto);
  }

  @Post('retry')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  retryPayment(@Body() paymentDto: RetryPaymentDto, @GetUser() user: User) {
    return this.paymentService.retryPayment(user, paymentDto);
  }

  @Get('verify')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  async verifyPayment(
    @Query('Authority') authority: string,
    @Query('Status') status: string,
    @GetUser() user: User,
    @Res() res: Response,
  ): Promise<PaymentRedirectResult> {
    return await this.paymentService.verify(user, { authority, status });
  }

  @Post('refund/:transactionId')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  refundPayment(@Param('transactionId', ParseIntPipe) transactionId: number, @Body() refundPaymentDto: RefundPaymentDto) {
    return this.paymentService.refund(transactionId, refundPaymentDto);
  }

  @Get('my/transactions')
  getMyTransactions(@GetUser() user: User, @Query() transactionsFilters: QueryMyTransactionsDto) {
    return this.paymentService.findUserTransactions(user.id, transactionsFilters);
  }

  @Get('transactions')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  getTransactions(@Query() transactionsFilters: QueryTransactionsDto) {
    return this.paymentService.findTransactions(transactionsFilters);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  getOneTransaction(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findOneTransaction(id);
  }
}
