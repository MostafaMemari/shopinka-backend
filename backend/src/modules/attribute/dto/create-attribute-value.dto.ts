import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class CreateAttributeValueDto {
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

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiPropertyOptional({ type: "string", required: false, nullable: true })
    colorCode?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @ApiPropertyOptional({ type: "string", required: false, nullable: true })
    buttonLabel?: string

    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", nullable: false, required: true })
    attributeId: number
}
