import { ApiProperty } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsNotEmpty, IsOptional, IsPostalCode, IsString } from "class-validator"

export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: 'string',
        required: true,
        nullable: false
    })
    province: string

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: 'string',
        required: true,
        nullable: false
    })
    city: string

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: 'string',
        required: true,
        nullable: false
    })
    address: string

    @IsString()
    @IsNotEmpty()
    @IsPostalCode('IR')
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: 'string',
        required: true,
        nullable: false
    })
    postalCode: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true
    })
    receiverMobile?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    @ApiProperty({
        type: 'string',
        required: false,
        nullable: true
    })
    description?: string
}

