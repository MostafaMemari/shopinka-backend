import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, Min, Max, IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";

export class PaymentDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        type: 'number',
        required: true,
        nullable: false,
        minimum: 1000,
        maximum: 200_000_000,
    })
    @Min(1000)
    @Max(200_000_000)
    @Transform(({ value }) => +value)
    amount: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        type: 'string',
        maxLength: 200,
        minLength: 5,
        nullable: false,
        required: true,
    })
    @MaxLength(200)
    @MinLength(5)
    description: string;
}
