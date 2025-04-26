import { Injectable, Logger } from '@nestjs/common';
import { ISendRequest } from 'src/common/interfaces/http.interface';
import { ZarinpalService } from '../http/zarinpal.service';
import { PaymentRepository } from './payment.repository';
import { TransactionStatus } from 'generated/prisma';
import { Cron, CronExpression } from '@nestjs/schedule';

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
            callbackUrl: data.callbackUrl,
        });

        await this.paymentRepository.create({ data: { amount: data.amount * 10, userId: data.userId, authority } });

        return { authority, code, gatewayURL }
    }

}
