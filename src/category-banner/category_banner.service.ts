import { Injectable } from "@nestjs/common";
import { messages } from "src/common/messages";
import { PrismaService } from 'src/prisma/prisma.service';
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateCategoryBannerDto } from "./dto/create_category_banner.dto";
import { UpdateCategoryBannerDto } from "./dto/update_category_banner.dto";

@Injectable()
export class CategoryBannerService {
    constructor(private prisma: PrismaService) { }

    // Get all category banners
    async getAllCategoryBanners() {
        const categoryBanners = await this.prisma.category_banners.findMany();
        if (categoryBanners.length <= 0) {
            return { statusCode: 200, messages: messages.CATEGORY_BANNER_LIST_EMPTY }
        }
        return { statusCode: 200, data: categoryBanners }
    }

    // Create category banner
    async createCategoryBanner(categoryBanner_info: CreateCategoryBannerDto) {
        // Mapping data to DTO
        const dto = plainToInstance(CreateCategoryBannerDto, categoryBanner_info, { excludeExtraneousValues: true });
        // Valadate
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error => {
                Object.values(error.constraints || {})
            })
            return { statusCode: 400, messages: messages };
        }
        // insert to db
        try {
            await this.prisma.category_banners.create({ data: dto })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.CATEGORY_BANNER_CREATION_FAILED }
        }
        return { statusCode: 201, messages: messages.CATEGORY_BANNER_CREATED }
    }

    // Update category banner
    async updateCategoryBanner(updateCategoryBanner: UpdateCategoryBannerDto) {
        // mapping data to DTO
        const dto = plainToInstance(UpdateCategoryBannerDto, updateCategoryBanner, { excludeExtraneousValues: true });
        // validate data in DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error => {
                Object.values(error.constraints || {})
            })
            return { statusCode: 400, messages: messages };
        }
        // remove id from dto to avoid updating
        const { id, ...updateData } = dto;
        // update to db
        try {
            await this.prisma.category_banners.update({ where: { id }, data: updateData })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.CATEGORY_BANNER_UPDATE_FAILED }
        }
        return { statusCode: 201, messages: messages.CATEGORY_BANNER_UPDATED }
    }
}