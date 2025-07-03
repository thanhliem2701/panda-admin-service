import { Controller,Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) { }

    // Get All users
    @MessagePattern("get_all_users")
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    // Get a user by ID
    @MessagePattern("get_user_by_id")
    async getAdminById(@Payload() data: { id: string }) {
        return await this.userService.getUserById(data.id);
    }

    // Create a new user
    @MessagePattern("create_new_user")
    async createNewAdmin(@Body() user_info: any) {
        return await this.userService.createNewUser(user_info);
    }

    //Update an existing user
    @MessagePattern("update_user_info")
    async updateAdminInfo(@Body() updateData: any) {
        return await this.userService.updateUserInfo(updateData);
    }
}