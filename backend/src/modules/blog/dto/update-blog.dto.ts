import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateBlogDto extends PartialType(OmitType(CreateBlogDto, ['mainImageId'])) {
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'null' || value === null) return null;
        return Number.parseInt(String(value)) || 0
    })
    @ApiProperty({ required: false, nullable: true })
    mainImageId?: number | null;
}
