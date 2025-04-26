import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ISendRequest } from '../../common/interfaces/http.interface';
import { ZarinpalService } from '../http/zarinpal.service';
import { PaymentRepository } from './payment.repository';
import { Transaction, TransactionStatus } from 'generated/prisma';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IVerifyPayment } from '../../common/interfaces/payment.interface';
import { PaymentMessages } from './enums/payment.messages';
import { RefundPaymentDto } from './dto/refund.dto';

@Injectable()
export class PaymentService {
    private readonly logger: Logger = new Logger(PaymentService.name)

    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly zarinpalService: ZarinpalService
    ) { }

    @Cron(CronExpression.EVERY_12_HOURS)
    async handelStaleTransactions() {
        try {
            this.logger.log('Checking for expired transactions...');

            const transactions = await this.paymentRepository.findAll({ where: { status: TransactionStatus.PENDING } });

            const now = new Date();
            const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

            transactions.forEach(async (transaction) => {
                if (new Date(transaction.createdAt) < twentyFourHoursAgo) {
                    await this.paymentRepository.update({ where: { id: transaction.id }, data: { status: TransactionStatus.FAILED } });
                    this.logger.warn(`Transaction ${transaction.id} marked as FAILED due to timeout.`);
                }
            });

            this.logger.log('Expired transactions processing completed.');
        } catch (error) {
            this.logger.error(`Error processing stale transactions: ${error.message}`, error.stack);
        }
    }

    async getGatewayUrl(data: ISendRequest) {
        const { authority, code, gatewayURL } = await this.zarinpalService.sendRequest({
            amount: data.amount * 10,
            description: data.description,
            user: data?.user,
        });

        await this.paymentRepository.create({ data: { amount: data.amount * 10, userId: data.userId, authority } });

        return { authority, code, gatewayURL }
    }

    async verify(data: IVerifyPayment) {
        let payment: null | Transaction = null;
        try {
            const { authority, status } = data;
            let redirectUrl = `${process.env.PAYMENT_FRONTEND_URL}?status=success`;

            payment = await this.paymentRepository.findOneOrThrow({ where: { authority } });

            if (payment.status !== TransactionStatus.PENDING) throw new BadRequestException(PaymentMessages.FailedOrVerified);

            const merchantId = process.env.ZARINPAL_MERCHANT_ID;

            const { code, sessionId } = await this.zarinpalService.verifyRequest({ authority, merchant_id: merchantId, amount: payment.amount });

            if (status !== 'OK' || code !== 100) {
                redirectUrl = `${process.env.PAYMENT_FRONTEND_URL}?status=failed`;
                payment = await this.paymentRepository.update({ where: { id: payment.id }, data: { status: TransactionStatus.FAILED } });
            } else {
                payment = await this.paymentRepository.update({ where: { id: payment.id }, data: { status: TransactionStatus.SUCCESS, sessionId } });
            }

            return { redirectUrl, payment, message: PaymentMessages.VerifiedSuccess }
        } catch (error) {
            if (payment?.id && payment.status === TransactionStatus.PENDING) {
                await this.paymentRepository.update({ where: { id: payment.id }, data: { status: TransactionStatus.FAILED } });
            }
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async refund(transactionId: number, refundPaymentDto: RefundPaymentDto) {
        const { description, reason } = refundPaymentDto;
        const transaction = await this.paymentRepository.findOneOrThrow({ where: { id: transactionId, status: TransactionStatus.SUCCESS } });

        if (!transaction.sessionId) throw new BadRequestException(PaymentMessages.SessionIdNotFound);

        const result = await this.zarinpalService.refund({
            amount: transaction.amount,
            sessionId: transaction.sessionId.slice(0, -2),
            description,
            reason,
        });

        await this.paymentRepository.update({ where: { id: transactionId }, data: { status: TransactionStatus.REFUNDED } });

        return { ...result, message: PaymentMessages.RefundedSuccess }
    }

}
