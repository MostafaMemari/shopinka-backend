import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional, IsString, IsDate, IsEnum, IsBoolean } from "class-validator"
import { SortOrder } from "../../../common/enums/shared.enum"
import { CommentSortBy } from "../enums/comment-sortby.enum"
import { PaginationDto } from "../../../common/dtos/pagination.dto"

export class QueryCommentDto extends PaginationDto {
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    isActive?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    isRecommended?: boolean

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
    includeProduct?: boolean

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
    includeReplies?: boolean

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
    @IsEnum(CommentSortBy)
    @ApiPropertyOptional({
        type: 'string',
        enum: CommentSortBy,
    })
    sortBy?: CommentSortBy;

    @IsOptional()
    @IsEnum(SortOrder)
    @ApiPropertyOptional({
        type: 'string',
        enum: SortOrder,
    })
    sortDirection?: SortOrder;
}