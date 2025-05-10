import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional, IsString, IsNotEmpty, MaxLength, Matches, IsNumber, IsPositive } from "class-validator"

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: true, nullable: false })
    name: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    @ApiProperty({ type: "string", required: false, nullable: true, maxLength: 120 })
    slug?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: false, nullable: true })
    description?: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    parentId?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    thumbnailImageId?: number
}
