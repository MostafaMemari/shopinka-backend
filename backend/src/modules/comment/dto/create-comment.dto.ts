import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, MaxLength, IsNumber, IsOptional, IsPositive, Min, Max } from "class-validator"
import { Transform } from "class-transformer"

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: true, nullable: false })
    title: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: true, nullable: false })
    content: string

    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({ type: "boolean", nullable: true, required: false })
    isRecommended?: boolean

    @IsOptional()
    @Min(1)
    @Max(5)
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true, minimum: 1, maximum: 5 })
    rate: number = 5

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: true, nullable: false })
    productId: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    parentId?: number
}
