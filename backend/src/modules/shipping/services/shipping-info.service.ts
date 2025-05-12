import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { ShippingInfoRepository } from "../repositories/shipping-info.repository";
import { UserRepository } from "../../user/user.repository";
import { OrderRepository } from "../../order/order.repository";
import { CreateShippingInfoDto } from "../dto/create-shipping-info.dto";
import { ShippingInfo } from "generated/prisma";

@Injectable()
export class ShippingInfoService {
    constructor(
        private readonly shippingInfoRepository: ShippingInfoRepository,
        private readonly userRepository: UserRepository,
        private readonly orderRepository: OrderRepository
    ) { }

    async create(userId: number, createShippingInfoDto: CreateShippingInfoDto): Promise<{ message: string, shippingInfo: ShippingInfo }> {
        const { orderId, trackingCode } = createShippingInfoDto

        const existingShippingInfo = await this.shippingInfoRepository.findOne({ where: { trackingCode } })

        if (existingShippingInfo) throw new ConflictException()

        const accessPermission = await this.userRepository.findOne({
            where: {
                OR: [
                    { products: { some: { userId } } },
                    { productVariants: { some: { userId } } }
                ]
            }
        })

        if (!accessPermission)
            throw new BadRequestException()

        const order = await this.orderRepository.findOneOrThrow({ where: { id: orderId } })

        const newShippingInfo = await this.shippingInfoRepository.create({
            data: { ...createShippingInfoDto, shippingId: order.shippingId }
        })

        return { message: "Created shipping info successfully.", shippingInfo: newShippingInfo }
    }
}