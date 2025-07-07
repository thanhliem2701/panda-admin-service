import { IsString, MaxLength, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsDate } from "class-validator"
import { Expose, Type } from 'class-transformer';

export class UpdateCategoryDto {
    @Expose()
    @IsNotEmpty() // Ensure the id is provided in the update request
    @IsNumber()
    @Type(() => Number)
    id: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @IsOptional()
    category_name?: string;

    @Expose()
    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    menu_id?: number;

    @Expose()
    @IsString()
    @IsOptional()
    imgurl?: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    display_order?: number;

    @Expose()
    @IsString()
    @IsOptional()
    tag?: string;

    @Expose()
    @IsBoolean()
    @IsOptional()
    enabled?: boolean = true;
}