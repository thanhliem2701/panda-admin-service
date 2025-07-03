import {  IsString, MaxLength, IsNotEmpty, IsNumber } from "class-validator"
import { Expose } from 'class-transformer';

export class CreateSideMenuDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    menu_name: string;  

    @Expose()
    @IsString()
    imgurl: string;

    @Expose()
    @IsNumber()
    display_order: number;

    @Expose()
    @IsString()
    tag: string;

    @Expose()
    enabled: boolean = true;
    @Expose()
    created_at: Date = new Date();
    @Expose()
    updated_at: Date = new Date();
}