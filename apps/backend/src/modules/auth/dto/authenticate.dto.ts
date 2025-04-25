import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class AuthenticateDto {
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('IR')
    @ApiProperty({
        type: 'string',
        nullable: false,
        required: true
    })
    mobile: string
}