import { Controller } from "@nestjs/common";
import { UserService } from "./user.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class UserController {
    constructor (private readonly userService: UserService) {}

    // Get All users
    @MessagePattern("get_all_users")
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    // Get user by Id

    // Create new user

    // Update user
 }