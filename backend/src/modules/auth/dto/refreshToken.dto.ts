import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsJWT } from "class-validator";

export class RefreshTokenDto {
    @IsString()
    @IsNotEmpty()
    @IsJWT()
    @ApiProperty({
        type: 'string',
        nullable: false,
        required: true
    })
    refreshToken: string
}