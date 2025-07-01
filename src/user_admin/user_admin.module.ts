import { Module } from "@nestjs/common";
import { UserAdminService } from "./user_admin.service";
import { UserAdminController } from "./user_admin.controller";

@Module({
    providers:[UserAdminService],
    controllers:[UserAdminController],
})
export class UserAdminModule {}