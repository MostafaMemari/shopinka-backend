import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ZarinpalService } from '../http/zarinpal.service';
import { PaymentRepository } from './payment.repository';
import { OrderItem, OrderStatus, Prisma, Transaction, TransactionStatus, User } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IVerifyPayment } from '../../common/interfaces/payment.interface';
import { PaymentMessages } from './enums/payment.messages';
import { RefundPaymentDto } from './dto/refund.dto';
import { QueryMyTransactionsDto } from './dto/user-transactions-query.dto';
import { pagination } from '../../common/utils/pagination.utils';
import { QueryTransactionsDto } from './dto/transactions-query.dto';
import { PaymentDto } from './dto/payment.dto';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { OrderRepository } from '../order/repositories/order.repository';
import { CartItemRepository } from '../cart/repositories/cardItem.repository';
import { ProductVariantRepository } from '../product/repositories/product-variant.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { CartRepository } from '../cart/repositories/cart.repository';
import { ShippingRepository } from '../shipping/repositories/shipping.repository';
import { RetryPaymentDto } from './dto/retry-payment.dto';
import { PaymentRedirectResult } from './types/payment.types';

@Injectable()
export class PaymentService {
  private readonly logger: Logger = new Logger(PaymentService.name);

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly zarinpalService: ZarinpalService,

    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly shippingRepository: ShippingRepository,
    private readonly orderRepository: OrderRepository,
    private readonly cartItemRepository: CartItemRepository,
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
    private readonly productVariantRepository: ProductVariantRepository,
  ) {}

  @Cron(CronExpression.EVERY_12_HOURS)
  async handelStaleTransactions() {
    try {
      this.logger.log('Checking for expired transactions...');

      const transactions = await this.paymentRepository.findAll({ where: { status: TransactionStatus.PENDING } });

      const now = new Date();
      const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      for (const transaction of transactions) {
        if (new Date(transaction.createdAt) < twentyFourHoursAgo) {
          await this.paymentRepository.update({ where: { id: transaction.id }, data: { status: TransactionStatus.FAILED } });
          this.logger.warn(`Transaction ${transaction.id} marked as FAILED due to timeout.`);
        }
      }

      this.logger.log('Expired transactions processing completed.');
    } catch (error) {
      this.logger.error(`Error processing stale transactions: ${error.message}`, error.stack);
    }
  }

  async getGatewayUrl(user: User, paymentDto: PaymentDto) {
    const cart = await this.cartService.me(user.id);

    const shipping = await this.shippingRepository.findOneOrThrow({ where: { id: paymentDto.shippingId } });

    const amountPrice = (cart.payablePrice + shipping.price) * 10;

    try {
      const { authority, code, gatewayURL } = await this.zarinpalService.sendRequest({
        amount: amountPrice,
        description: paymentDto.description ?? 'PAYMENT ORDER',
        user: { email: 'example@gmail.com', mobile: user.mobile },
      });

      if (authority && code && gatewayURL) {
        const order = await this.orderService.create(user.id, cart, paymentDto);

        await this.paymentRepository.create({
          data: {
            amount: amountPrice,
            userId: user.id,
            authority,
            orderId: order.id,
            invoiceNumber: new Date().getTime().toString(),
          },
        });

        return { authority, code, gatewayURL };
      } else {
        throw new BadRequestException(PaymentMessages.FailPayment);
      }
    } catch (error) {
      // await this.orderRepository.delete({ where: { id: order.id } });
      throw error;
    }
  }

  async retryPayment(user: User, dto: RetryPaymentDto) {
    const order = await this.orderRepository.findOneOrThrow({
      where: { id: dto.orderId, userId: user.id },
      include: { shipping: { select: { price: true } } },
    });

    if (order.status !== 'PENDING') throw new BadRequestException(PaymentMessages.OrderNotPayable);

    const shipping = await this.shippingRepository.findOne({ where: { id: order.shippingId } });
    const amountPrice = (order.totalPrice + (shipping?.price ?? 0)) * 10;

    try {
      const { authority, code, gatewayURL } = await this.zarinpalService.sendRequest({
        amount: amountPrice,
        description: `پرداخت مجدد سفارش #${order.id}`,
        user: { email: 'example@gmail.com', mobile: user.mobile },
      });

      if (authority && code && gatewayURL) {
        await this.paymentRepository.upsert({
          where: { orderId: order.id },
          update: {
            amount: amountPrice,
            userId: user.id,
            authority,
            invoiceNumber: new Date().getTime().toString(),
            status: 'PENDING',
            updatedAt: new Date(),
          },
          create: {
            amount: amountPrice,
            userId: user.id,
            authority,
            orderId: order.id,
            invoiceNumber: new Date().getTime().toString(),
            status: 'PENDING',
          },
        });

        return { authority, code, gatewayURL };
      } else {
        throw new BadRequestException(PaymentMessages.FailPayment);
      }
    } catch (error) {
      throw error;
    }
  }

  async verify(user: User, { authority, status }: IVerifyPayment): Promise<PaymentRedirectResult> {
    const paymentFrontEndUrl = process.env.PAYMENT_FRONTEND_URL;
    let payment: Transaction | null = null;

    try {
      payment = await this.paymentRepository.findOneOrThrow({ where: { authority, userId: user.id } });

      if (payment.status !== TransactionStatus.PENDING) throw new BadRequestException(PaymentMessages.FailedOrVerified);

      if (status === 'NOK') {
        await this.failPayment(payment);
        return this.buildRedirectUrl(paymentFrontEndUrl, 'failed', {
          ...payment,
          status: TransactionStatus.FAILED,
        });
      }

      if (status === 'OK') {
        const { code, sessionId } = await this.zarinpalService.verifyRequest({
          authority,
          amount: payment.amount,
        });

        const isSuccess = code === 100 || code === 101;

        await this.updateOrderStatus(payment.orderId, isSuccess);
        await this.updatePaymentStatus(payment.id, isSuccess, sessionId);

        return this.buildRedirectUrl(paymentFrontEndUrl, isSuccess ? 'success' : 'failed', {
          ...payment,

          status: isSuccess ? TransactionStatus.SUCCESS : TransactionStatus.FAILED,
        });
      }

      throw new BadRequestException(PaymentMessages.UnknownStatus);
    } catch (error) {
      if (payment?.id && payment.status === TransactionStatus.PENDING) {
        await this.failPayment(payment);
      }

      return this.buildRedirectUrl(paymentFrontEndUrl, 'failed', {
        ...payment,
        status: TransactionStatus.FAILED,
      });
    }
  }

  private async failPayment(payment: Transaction) {
    await this.updateOrderStatus(payment.orderId, false);
    await this.updatePaymentStatus(payment.id, false);
  }

  private buildRedirectUrl(baseUrl: string, status: 'success' | 'failed', payment: Partial<Transaction>): PaymentRedirectResult {
    const params = new URLSearchParams({
      status,
      orderId: payment.orderId?.toString() || '',
    });

    const redirectUrl = `${baseUrl}?${params.toString()}`;

    return {
      redirectUrl,
      message: status === 'success' ? PaymentMessages.VerifiedSuccess : PaymentMessages.FailPayment,
      payment: payment as Transaction,
    };
  }

  async refund(transactionId: number, refundPaymentDto: RefundPaymentDto) {
    const { description, reason } = refundPaymentDto;
    const transaction = await this.paymentRepository.findOneOrThrow({
      where: { id: transactionId, status: TransactionStatus.SUCCESS },
      include: { order: true },
    });

    if (!transaction.sessionId) throw new BadRequestException(PaymentMessages.SessionIdNotFound);

    if (transaction['order'].status !== OrderStatus.CANCELLED) throw new BadRequestException(PaymentMessages.OrderNotCancelled);

    const result = await this.zarinpalService.refund({
      amount: transaction.amount,
      sessionId: transaction.sessionId.slice(0, -2),
      description,
      reason,
    });

    await this.paymentRepository.update({ where: { id: transactionId }, data: { status: TransactionStatus.REFUNDED } });

    return { ...result, message: PaymentMessages.RefundedSuccess, transaction };
  }

  async findTransactions({ page, take, ...transactionsFiltersDto }: QueryTransactionsDto): Promise<unknown> {
    const paginationDto = { page, take };
    const { includeOrder, authority, endDate, maxAmount, minAmount, sortBy, sortDirection, startDate, status, userId, includeUser } =
      transactionsFiltersDto;

    const filters: Prisma.TransactionWhereInput = {};

    if (userId) filters.userId = userId;
    if (authority) filters.authority = authority;
    if (status) filters.status = status;
    if (minAmount || maxAmount) {
      filters.amount = {};
      if (minAmount) filters.amount.gte = minAmount * 10;
      if (maxAmount) filters.amount.lte = maxAmount * 10;
    }
    if (startDate || endDate) {
      filters.createdAt = {};
      if (startDate) filters.createdAt.gte = new Date(startDate);
      if (endDate) filters.createdAt.lte = new Date(endDate);
    }

    const transactions = await this.paymentRepository.findAll({
      where: filters,
      orderBy: { [sortBy || 'createdAt']: sortDirection || 'desc' },
      include: { order: includeOrder, user: includeUser },
    });

    return { ...pagination(paginationDto, transactions) };
  }

  async findUserTransactions(userId: number, transactionsFilters: QueryMyTransactionsDto): Promise<unknown> {
    return await this.findTransactions({ userId, ...transactionsFilters });
  }

  findOneTransaction(transactionId: number): Promise<never | Transaction> {
    return this.paymentRepository.findOneOrThrow({ where: { id: transactionId }, include: { order: true, user: true } });
  }

  private async increaseCartItemsStock(userId: number) {
    const cartItems = await this.cartItemRepository.findAll({
      where: { cart: { userId } },
      include: { product: true, productVariant: true },
    });

    for (const item of cartItems) {
      if (item.productId) {
        await this.productRepository.update({
          where: { id: item.productId },
          data: { quantity: { increment: item.quantity } },
        });
      }
      if (item.productVariantId) {
        await this.productVariantRepository.update({
          where: { id: item.productVariantId },
          data: { quantity: { increment: item.quantity } },
        });
      }
    }
  }

  private async updateOrderStatus(orderId: number, isSuccess: boolean) {
    return this.orderRepository.update({
      where: { id: orderId },
      data: { status: isSuccess ? OrderStatus.PROCESSING : OrderStatus.PENDING },
      include: { items: true },
    });
  }

  private async updatePaymentStatus(paymentId: number, isSuccess: boolean, sessionId?: string) {
    return this.paymentRepository.update({
      where: { id: paymentId },
      data: {
        status: isSuccess ? TransactionStatus.SUCCESS : TransactionStatus.FAILED,
        ...(sessionId && { sessionId }),
      },
    });
  }

  private async restoreCart(userId: number, orderItems: OrderItem[]) {
    await this.increaseCartItemsStock(userId);

    const cartItemsToConnect = orderItems.map((item) => ({ id: item.id }));

    await this.cartRepository.update({
      where: { userId },
      data: {
        items: {
          connect: cartItemsToConnect,
        },
      },
    });
  }
}
