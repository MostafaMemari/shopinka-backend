import { IsOptional, IsDate, IsString, IsEnum, IsNumber, IsPositive, IsNotEmpty, Max, Min, IsBoolean } from "class-validator";
import { SortOrder } from "../../../common/enums/shared.enum";
import { Transform } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { ProductVariantSortBy } from "../enums/product-variant-sortby.enum";

export class QueryProductVariantDto extends PaginationDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: false, nullable: true })
    sku?: string

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: "string", required: false, nullable: true })
    shortDescription?: string

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    quantity?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(200_000_000)
    @Min(1000)
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    maxPrice?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Max(200_000_000)
    @Min(1000)
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    minPrice?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @Max(200_000_000)
    @Min(1000)
    @ApiProperty({ type: "number", required: false, nullable: true })
    salePrice?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    width?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    height?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    length?: number

    @IsOptional()
    @IsNumber()
    @IsPositive()
    @Transform(({ value }) => +value)
    @ApiProperty({ type: "number", required: false, nullable: true })
    weight?: number

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
    includeAttributeValues?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeMainImage?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({ type: "boolean", nullable: true, required: false })
    includeUser?: boolean

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
    @IsEnum(ProductVariantSortBy)
    @ApiPropertyOptional({
        type: 'string',
        enum: ProductVariantSortBy,
    })
    sortBy?: ProductVariantSortBy;

    @IsOptional()
    @IsEnum(SortOrder)
    @ApiPropertyOptional({
        type: 'string',
        enum: SortOrder,
    })
    sortDirection?: SortOrder;
}
