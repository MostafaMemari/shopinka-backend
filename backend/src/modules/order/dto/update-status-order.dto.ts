import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { OrderStatus } from "generated/prisma";

enum UpdateOrderStatus {
    CANCELLED = "CANCELLED",
    DELIVERED = "DELIVERED"
}

export class UpdateOrderStatusDto {
    @IsOptional()
    @IsEnum(UpdateOrderStatus)
    @IsNotEmpty()
    @ApiProperty({ enum: UpdateOrderStatus, type: 'string', required: true, nullable: false })
    status: OrderStatus
}