import { IsString, MaxLength, IsNotEmpty, IsNumber, IsOptional, IsBoolean } from "class-validator"
import { Expose, Type } from 'class-transformer';

export class UpdateTopBannerDto {
    @Expose()
    @IsNotEmpty() // Ensure the id is provided in the update request
    @IsNumber()
    @Type(() => Number)
    id: number;

    @Expose()
    @IsString()
    @IsOptional()
    @MaxLength(50)     // Maximum length of 50 characters
    banner_name?: string;

    @Expose()
    @IsString()
    @IsOptional()
    imgurl?: string;

    @Expose()
    @IsOptional()
    detail_link?: string;
    
    @Expose()
    @IsBoolean()
    @IsOptional()
    enabled?: boolean = true;
}