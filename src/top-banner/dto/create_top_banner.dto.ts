import {  IsString, MaxLength, IsNotEmpty, IsOptional } from "class-validator"
import { Expose } from 'class-transformer';

export class CreateTopBannerDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    banner_name: string;  

    @Expose()
    @IsString()
    @IsOptional()
    imgurl: string;

    @Expose()
    @IsOptional()
    detail_link: string;

}