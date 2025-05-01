import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class CreateGalleryItemDto {
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({
        type: "number",
        nullable: false,
        required: true
    })
    galleryId: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: "string",
        nullable: true,
        required: false
    })
    title?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: "string",
        nullable: true,
        required: false
    })
    description?: string
}
