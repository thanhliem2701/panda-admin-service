import { IsString, MaxLength, IsNotEmpty, IsNumber,IsOptional } from "class-validator"
import { Expose, Type } from 'class-transformer';

export class CreateCategoryDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    category_name: string;

    @Expose()
    @IsNotEmpty()           // Ensure the id is provided in the update request
    @IsNumber()
    @Type(() => Number)
    menu_id: number;

    @Expose()
    @IsString()
    @IsOptional()
    imgurl: string;

    @Expose()
    @IsNumber()
    @IsOptional()
    display_order: number;

    @Expose()
    @IsString()
    @IsOptional()
    tag: string;
}