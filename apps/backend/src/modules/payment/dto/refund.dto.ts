import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength, MinLength, IsEnum } from "class-validator";
import { RefundPaymentReason } from "../enums/reason.enum";

export class RefundPaymentDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    @MinLength(4)
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true,
    })
    description?: string;

    @IsOptional()
    @IsEnum(RefundPaymentReason)
    @ApiProperty({
        type: 'string',
        enum: RefundPaymentReason,
        nullable: true,
        required: false,
    })
    reason?: RefundPaymentReason;
}