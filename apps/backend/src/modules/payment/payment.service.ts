import { Injectable } from '@nestjs/common';
import { ISendRequest } from 'src/common/interfaces/http.interface';
import { ZarinpalService } from '../http/zarinpal.service';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
    constructor(
        private readonly paymentRepository: PaymentRepository,
        private readonly zarinpalService: ZarinpalService
    ) { }

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
