import { Injectable } from "@nestjs/common";
import { messages } from "src/common/messages";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UserService {
    constructor(public Prisma: PrismaService) { }
    /*------ Get all users ------*/
    async getAllUsers() {
        const users = await this.Prisma.users.findMany()
        if (!users) {
            return { success: false, messages: messages.USER_LIST_EMPTY }
        }
        const user_list = users.map(({ pw: _, ...user }) => user);
        return { success: true, data: user_list };
    }
}