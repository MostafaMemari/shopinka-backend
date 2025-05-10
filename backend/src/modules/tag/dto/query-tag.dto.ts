import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsDate, IsEnum, IsString } from "class-validator";
import { SortOrder } from "../../../common/enums/shared.enum";
import { Transform } from "class-transformer";
import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { TagSortBy } from "../enums/tag-sortby.enum";

export class QueryTagDto extends PaginationDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: 'string',
        nullable: true,
        required: false,
    })
    name?: string;

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({
        type: 'boolean',
        nullable: true,
        required: false
    })
    includeThumbnailImage?: boolean


    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({
        type: 'boolean',
        nullable: true,
        required: false
    })
    includeProducts?: boolean


    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({
        type: 'boolean',
        nullable: true,
        required: false
    })
    includeBlogs?: boolean


    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({
        type: 'boolean',
        nullable: true,
        required: false
    })
    includeUser?: boolean

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({
        type: 'boolean',
        nullable: true,
        required: false
    })
    includeSeoMeta?: boolean

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({ type: 'string', format: 'date-time', nullable: true, required: false })
    startDate?: Date;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiProperty({ type: 'string', format: 'date-time', nullable: true, required: false })
    endDate?: Date;

    @IsOptional()
    @IsString()
    @IsEnum(TagSortBy)
    @ApiProperty({
        type: 'string',
        enum: TagSortBy,
        nullable: true,
        required: false,
    })
    sortBy?: TagSortBy;

    @IsOptional()
    @IsEnum(SortOrder)
    @ApiProperty({
        type: 'string',
        enum: SortOrder,
        nullable: true,
        required: false,
    })
    sortDirection?: SortOrder;
}