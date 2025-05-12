import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength, MinLength, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class PaymentDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({ type: 'number', required: true, nullable: false })
    @Transform(({ value }) => +value)
    addressId: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({ type: 'number', required: true, nullable: false })
    @Transform(({ value }) => +value)
    shippingId: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: 'string',
        maxLength: 200,
        minLength: 5,
        nullable: true,
        required: false,
    })
    @MaxLength(200)
    @MinLength(5)
    description?: string;
}
