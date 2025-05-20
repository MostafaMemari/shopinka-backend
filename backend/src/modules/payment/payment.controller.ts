import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Role, User } from 'generated/prisma';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { SwaggerConsumes } from '../../common/enums/swagger-consumes.enum';
import { PaymentDto } from './dto/payment.dto';
import { AuthDecorator } from '../../common/decorators/auth.decorator';
import { RefundPaymentDto } from './dto/refund.dto';
import { QueryMyTransactionsDto } from './dto/user-transactions-query.dto';
import { Roles } from '../../common/decorators/role.decorator';
import { QueryTransactionsDto } from './dto/transactions-query.dto';

@Controller('payment')
@ApiTags('payment')
@AuthDecorator()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  gatewayUrl(@Body() paymentDto: PaymentDto, @GetUser() user: User) {
    return this.paymentService.getGatewayUrl(user.id, paymentDto);
  }

  @Get('verify')
  @ApiConsumes(SwaggerConsumes.Json, SwaggerConsumes.UrlEncoded)
  verifyPayment(@Query('Authority') authority: string, @Query('Status') status: string) {
    return this.paymentService.verify({ authority, status });
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
