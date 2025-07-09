import { IsString, MaxLength, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from "class-validator"
import { Expose, Type } from 'class-transformer';

export class UpdateSideMenuDto {
    @Expose()
    @IsNotEmpty() // Ensure the id is provided in the update request
    @IsNumber()
    @Type(() => Number)
    id: number;

    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(50)     // Maximum length of 50 characters
    menu_name?: string;

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