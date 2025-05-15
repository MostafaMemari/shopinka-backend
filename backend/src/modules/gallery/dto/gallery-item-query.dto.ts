import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsBoolean, IsDate, IsEnum, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"
import { SortOrder } from "../../../common/enums/shared.enum"
import { GalleryItemSortBy } from "../enums/gallery-item-sortby.enum"
import { PaginationDto } from "../../../common/dtos/pagination.dto"

export class GalleryItemQueryDto extends PaginationDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: 'number' })
    galleryId?: number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: 'string' })
    title?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: 'string' })
    description?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: 'string' })
    fileUrl?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: 'string' })
    fileKey?: string

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ type: 'string' })
    mimetype?: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: 'number' })
    minSize?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: 'number' })
    maxSize?: number

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: 'boolean' })
    includeGallery?: boolean

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: 'boolean' })
    includeTags?: boolean

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: 'boolean' })
    includeSeoMeta?: boolean

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: 'boolean' })
    isDeleted?: boolean

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    deletedAt?: Date;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    startDate?: Date;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({ type: 'string', format: 'date-time' })
    endDate?: Date;

    @IsOptional()
    @IsString()
    @IsEnum(GalleryItemSortBy)
    @ApiPropertyOptional({
        type: 'string',
        enum: GalleryItemSortBy,
    })
    sortBy?: GalleryItemSortBy;

    @IsOptional()
    @IsEnum(SortOrder)
    @ApiPropertyOptional({
        type: 'string',
        enum: SortOrder,
    })
    sortDirection?: SortOrder;
}