import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAiDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({type: "string"  , required: true , nullable: false})
    message: string
}
