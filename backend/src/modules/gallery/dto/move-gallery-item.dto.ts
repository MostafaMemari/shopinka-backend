import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsOptional, IsNumber, IsPositive } from "class-validator";
import { Transform } from "class-transformer";
import { RemoveGalleryItemDto } from "./remove-gallery-item.dto";

export class MoveGalleryItemDto extends OmitType(RemoveGalleryItemDto, ['isForce']) {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: 'number', nullable: false, required: true })
    galleryId: number
}