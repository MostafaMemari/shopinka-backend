import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsPositive } from "class-validator";
import { Transform } from "class-transformer";

export class MoveGalleryItemDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: 'number', nullable: false, required: true })
    galleryId: number
}