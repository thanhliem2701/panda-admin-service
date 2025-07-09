import { Injectable } from "@nestjs/common";
import { messages } from "src/common/messages";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTopBannerDto } from "./dto/create_top_banner.dto";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateTopBannerDto } from "./dto/update_top_banner.dto";

@Injectable()
export class TopBannerService {
    constructor(private readonly prisma: PrismaService) { }

    // Get all top banners
    async getAllTopBanners() {
        const topBanners = await this.prisma.top_banners.findMany()
        if (topBanners.length <= 0) {
            return { statusCode: 200, messages: messages.TOP_BANNER_LIST_EMPTY }
        }
        return { statusCode: 200, data: topBanners }
    }

    // Create top banner
    async createTopBanner(topBanner_info: CreateTopBannerDto) {
        // Mapping data to DTO
        const dto = plainToInstance(CreateTopBannerDto, topBanner_info, { excludeExtraneousValues: true });
        // Valadate
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error => {
                Object.values(error.constraints || {})
            })
            return { statusCode: 400, messages: messages };
        }
        // insert new menu to db
        try {
            await this.prisma.top_banners.create({ data: dto })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.TOP_BANNER_CREATION_FAILED }
        }
        return { statusCode: 201, messages: messages.TOP_BANNER_CREATED }
    }

    // Update top banner
    async updateTopBanner(updateTopBanner: UpdateTopBannerDto) {
        // mapping data to DTO
        const dto = plainToInstance(UpdateTopBannerDto, updateTopBanner, { excludeExtraneousValues: true });
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
        // update menu to db
        try {
            await this.prisma.top_banners.update({ where: { id }, data: updateData })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.TOP_BANNER_UPDATE_FAILED }
        }
        return { statusCode: 201, messages: messages.TOP_BANNER_UPDATED }
    }
}