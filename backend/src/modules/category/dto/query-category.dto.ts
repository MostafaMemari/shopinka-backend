import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional, IsString, IsNotEmpty, IsDate, IsEnum, IsBoolean, IsNumber, Min } from "class-validator"
import { SortOrder } from "../../../common/enums/shared.enum"
import { CategorySortBy } from "../enums/category-sortby.enum"
import { PaginationDto } from "../../../common/dtos/pagination.dto"

export class QueryCategoryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ type: "string", nullable: true, required: false })
    slug?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiPropertyOptional({ type: "string", nullable: true, required: false })
    description?: string

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: "number", nullable: true, required: false })
    childrenDepth?: number

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeUser?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeBlogs?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeProducts?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeThumbnailImage?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeParent?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeChildren?: boolean

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
    @IsEnum(CategorySortBy)
    @ApiPropertyOptional({
        type: 'string',
        enum: CategorySortBy,
    })
    sortBy?: CategorySortBy;

    @IsOptional()
    @IsEnum(SortOrder)
    @ApiPropertyOptional({
        type: 'string',
        enum: SortOrder,
    })
    sortDirection?: SortOrder;
}