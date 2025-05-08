import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayUnique, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SeoMetaDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    title?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    description?: string

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @Type(() => String)
    @IsNotEmpty()
    @ApiProperty({ type: 'array', isArray: true, items: { type: 'string', nullable: false }, required: false, nullable: true })
    keywords?: string[]

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    canonicalUrl?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    ogTitle?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    ogDescription?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    ogImage?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: 'string', required: false, nullable: true })
    robotsTag?: string
}