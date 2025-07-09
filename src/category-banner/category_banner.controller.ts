import { Controller, Body } from "@nestjs/common";
import { CategoryBannerService } from "./category_banner.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class CategoryBannerController {
    constructor(
        private readonly categoryBannerService: CategoryBannerService
    ) { }

    // Get all category banners
    @MessagePattern('get_all_category_banners')
    async getAllCategoryBanners() {
        return await this.categoryBannerService.getAllCategoryBanners();
    }

    // Create category banner
    @MessagePattern('create_category_banner')
    async createCategoryBanner(@Body() categoryBanner_info: any) {
        return await this.categoryBannerService.createCategoryBanner(categoryBanner_info)
    }

    // update category banner
    @MessagePattern('update_category_banner')
    async updateCategoryBanner(@Body() categoryBanner_info: any) {
        return await this.categoryBannerService.updateCategoryBanner(categoryBanner_info)
    }
}