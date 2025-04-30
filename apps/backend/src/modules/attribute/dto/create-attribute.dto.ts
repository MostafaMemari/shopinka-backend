import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { AttributeType } from "generated/prisma"

export class CreateAttributeDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @ApiProperty({ type: "string", required: true, nullable: false })
    name: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    @IsOptional()
    @ApiProperty({ type: "string", required: false, nullable: true })
    slug?: string

    @IsEnum(AttributeType)
    @IsNotEmpty()
    @ApiProperty({ type: "string", enum: AttributeType, required: true, nullable: false })
    type: AttributeType

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    @ApiProperty({ type: "string", required: false, nullable: true })
    description?: string
}
