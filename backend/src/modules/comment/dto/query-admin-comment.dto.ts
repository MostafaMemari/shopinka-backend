import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsBoolean } from "class-validator";
import { PaginationDto } from "../../../common/dtos/pagination.dto";
import { Transform } from "class-transformer";

export class QueryAdminCommentDto extends PaginationDto {
    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => {
        if (typeof value == 'string') return value == 'true'
        return value
    })
    @ApiProperty({ type: "boolean", nullable: true, required: false })
    isActive?: boolean
}