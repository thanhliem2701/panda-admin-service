import { IsString, MaxLength, IsNotEmpty, IsOptional,IsNumber } from "class-validator"
import { Expose, Type } from 'class-transformer';

export class CreateCategoryBannerDto {
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

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    menu_id: number;

}