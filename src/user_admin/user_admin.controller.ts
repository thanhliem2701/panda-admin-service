import { Body, Controller } from "@nestjs/common";
import { UserAdminService } from "./user_admin.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserAdminDto } from "./dto/create_user_admin.dto";

@Controller()
export class UserAdminController {
    constructor( private readonly userAdminService: UserAdminService) {}

    // Get all user admins
    @MessagePattern("get_all_admins")
    async getAllUserAdmins() {
        return await this.userAdminService.getAllUserAdmins();
    }

    // Get a user admin by ID
    @MessagePattern("get_admin_by_id")
    async getAdminById(@Payload() data: { id : string}) {
        return await this.userAdminService.getAdminById(data.id);
    }

    // Create a new admin
    @MessagePattern("create_new_admin")
    async createNewAdmin(@Body() admin_info: any) {
        return await this.userAdminService.createNewAdmin(admin_info);
    }

    //Update an existing admin
    @MessagePattern("update_admin_info")
    async updateAdminInfo(@Body() updateData: any){
        return await this.userAdminService.updateAdminInfo(updateData);
    }
}