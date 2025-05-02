import { ApiPropertyOptional } from "@nestjs/swagger"
import { Transform } from "class-transformer"
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { Role } from "generated/prisma"
import { PaginationDto } from "../../../common/dtos/pagination.dto"
import { UserSortBy } from "../enums/sort-by.enum"
import { SortOrder } from "../../../common/enums/shared.enum"

export class QueryUsersDto extends PaginationDto {
    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({
        type: "string",
        nullable: true,
        required: false
    })
    fullName?: string

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({
        type: "string",
        nullable: true,
        required: false
    })
    mobile?: string

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({
        type: "string",
        format: "date-time",
        nullable: true,
        required: false
    })
    lastMobileChange?: Date

    @IsBoolean()
    @IsOptional()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiPropertyOptional({
        type: "boolean",
        nullable: true,
        required: false
    })
    isVerifiedMobile?: boolean

    @IsString()
    @IsOptional()
    @IsEnum(Role)
    @ApiPropertyOptional({
        type: "enum",
        enum: Role,
        nullable: true,
        required: false
    })
    role?: Role

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({
        type: "string",
        format: "date-time",
        nullable: true,
        required: false
    })
    startDate?: Date

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => new Date(value))
    @ApiPropertyOptional({
        type: "string",
        format: "date-time",
        nullable: true,
        required: false
    })
    endDate?: Date

    @IsOptional()
    @IsEnum(UserSortBy)
    @ApiPropertyOptional({
        type: 'string',
        enum: UserSortBy,
        nullable: true,
        required: false,
    })
    sortBy?: UserSortBy;

    @IsOptional()
    @IsEnum(SortOrder)
    @ApiPropertyOptional({
        type: 'string',
        enum: SortOrder,
        nullable: true,
        required: false,
    })
    sortDirection?: SortOrder;
}