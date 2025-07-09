import { Module } from "@nestjs/common";
import { TopBannerController } from "./top_banner.controller";
import { TopBannerService } from "./top_banner.service";

@Module({
    controllers: [TopBannerController],
    providers: [TopBannerService],
})
export class TopBannerModule { }