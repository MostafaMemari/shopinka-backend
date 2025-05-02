import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import {IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Max, MaxLength, Min } from "class-validator"

export class CreateProductVariantDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty({ type: "string", required: true, nullable: false, maxLength: 30 })
    sku: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: false, nullable: true })
    description?: string

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    quantity: number

    @IsNumber()
    @IsPositive()
    @Max(200_000_000)
    @Min(1000)
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    basePrice: number

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @Max(200_000_000)
    @Min(1000)
    @ApiProperty({ type: "number", required: true, nullable: false })
    salePrice: number

    @IsNumber()
    @Transform(({ value }) => +value)
    @IsPositive()
    @ApiProperty({ type: "number", required: true, nullable: false })
    mainImageId: number

    @IsNumber()
    @Transform(({ value }) => +value)
    @IsPositive()
    @ApiProperty({ type: "number", required: true, nullable: false })
    productId: number

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    width: number

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    height: number

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    length: number

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    weight: number
}
