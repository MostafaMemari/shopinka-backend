import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsOptional, IsString, IsDate, IsEnum, IsBoolean, IsNumber, Min, IsPositive } from "class-validator"
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
    isRecommended?: boolean

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: "number", nullable: true, required: false })
    repliesDepth?: number

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: "number", nullable: true, required: false })
    blogId?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiPropertyOptional({ type: "number", nullable: true, required: false })
    productId?: number

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
    includeBlog?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeReplies?: boolean
}