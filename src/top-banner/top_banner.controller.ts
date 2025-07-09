import { Body, Controller } from "@nestjs/common";
import { TopBannerService } from "./top_banner.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class TopBannerController {
    constructor(private readonly topBannerService: TopBannerService) { }

    // Get all top banners
    @MessagePattern('get_all_top_banners')
    async getAllTopBanners() {
        return await this.topBannerService.getAllTopBanners();
    }

    // Create top banner
    @MessagePattern('create_top_banner')
    async createTopBanner(@Body() topBanner_info: any){
        return await this.topBannerService.createTopBanner(topBanner_info)
    }

    // update top banner
    @MessagePattern('update_top_banner')
    async updateTopBanner(@Body() topBanner_info: any){
        return await this.topBannerService.updateTopBanner(topBanner_info)
    }
}