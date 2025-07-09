import { Module } from "@nestjs/common";
import { CategoryBannerController } from "./category_banner.controller";
import { CategoryBannerService } from "./category_banner.service";

@Module({
    controllers: [CategoryBannerController],
    providers: [CategoryBannerService],
})
export class CategoryBannerModule { }