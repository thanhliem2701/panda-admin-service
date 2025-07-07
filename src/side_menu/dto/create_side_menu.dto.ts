import {  IsString, MaxLength, IsNotEmpty, IsNumber, IsOptional, IsBoolean, IsDate } from "class-validator"
import { Expose } from 'class-transformer';

export class CreateSideMenuDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    menu_name: string;  

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