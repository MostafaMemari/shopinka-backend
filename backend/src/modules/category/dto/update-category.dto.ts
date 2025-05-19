import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoryDto extends OmitType(PartialType(CreateCategoryDto), ['thumbnailImageId']) {
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'null' || value === null) return null;
        return Number.parseInt(String(value)) || 0
    })
    @ApiProperty({ required: false, nullable: true })
    thumbnailImageId?: number | null;
}
