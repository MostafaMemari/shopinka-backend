import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator"

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({
        type: "string",
        required: false,
        nullable: true
    })
    fullName?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @IsPhoneNumber('IR')
    @ApiPropertyOptional({
        type: "string",
        required: false,
        nullable: true
    })
    mobile?: string
}
