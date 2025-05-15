import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, ['mainImageId'])) {
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'null' || value === null) return null;
        return Number.parseInt(String(value)) || 0
    })
    @ApiProperty({ required: false, nullable: true })
    mainImageId?: number | null;
}
