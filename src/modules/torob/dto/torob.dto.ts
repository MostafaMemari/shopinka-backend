import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, Min, ArrayMinSize, IsIn } from 'class-validator';

export class TorobProductsRequestDto {
  @ApiPropertyOptional({
    type: [String],
    description: 'List of product URLs (at least 1)',
    example: ['https://shopinka.ir/product/34', 'https://shopinka.ir/product/35'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  page_urls?: string[];

  @ApiPropertyOptional({
    type: [String],
    description: 'List of unique product identifiers (at least 1)',
    example: ['12412_1', '12412_2'],
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  page_uniques?: string[];

  @ApiPropertyOptional({
    description: 'Page number for pagination (start from 1)',
    minimum: 1,
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    description: 'Sorting method: date_added_desc or date_updated_desc',
    enum: ['date_added_desc', 'date_updated_desc'],
    example: 'date_added_desc',
  })
  @IsOptional()
  @IsString()
  @IsIn(['date_added_desc', 'date_updated_desc'])
  sort?: 'date_added_desc' | 'date_updated_desc';
}
