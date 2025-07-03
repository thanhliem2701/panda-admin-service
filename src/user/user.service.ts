import { Injectable } from "@nestjs/common";
import { messages } from "src/common/messages";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from "./dto/create_user.dto";
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserDto } from "./dto/update_user.dto";

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

    /*------ Get user by id ------*/
    async getUserById(id: string) {
        const parseIntId = parseInt(id);
        if (!parseIntId) {
            return { success: false, messages: messages.USER_ID_NOT_PROVIDED };
        }
        const user = await this.Prisma.users.findUnique({ where: { id: parseIntId } });
        if (!user) {
            return { success: false, messages: messages.USER_NOT_FOUND };
        }
        const { pw: _, ...user_info } = user;
        return { success: true, data: user_info };
    }

    /*------ Create a new user  ------*/
    async createNewUser(createUserDto: CreateUserDto) {
        // mapping data to DTO
        const dto = plainToInstance(CreateUserDto, createUserDto, { excludeExtraneousValues: true });
        //validate data in DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error =>
                Object.values(error.constraints || {})
            );
            return { success: false, messages: messages };
        }
        // use bycrypt saltRounds to hash the password
        const saltRounds = 10;
        // encrypt the password before saving
        const hashedPassword = await bcrypt.hash(dto.pw, saltRounds);
        dto.pw = hashedPassword;
        // insert new user into database
        try {
            await this.Prisma.users.create({ data: dto })
        } catch (error) {
            return { success: false, messages: messages.USER_CREATION_FAILED };
        }
        return { success: true, messages: messages.USER_CREATED };
    }

    /*------ Update an existing user  ------*/
    async updateUserInfo(updateUserDto: UpdateUserDto) {
        // mapping data to DTO
        const dto = plainToInstance(UpdateUserDto, updateUserDto, { excludeExtraneousValues: true });

        //validate data in DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error =>
                Object.values(error.constraints || {})
            );
            return { success: false, messages: messages };
        }

        // update password if provided
        if (dto.pw) {
            // use bycrypt saltRounds to hash the password
            const saltRounds = 10;
            // encrypt the password before saving
            const hashedPassword = await bcrypt.hash(dto.pw, saltRounds);
            dto.pw = hashedPassword;
        }
        // remove id from dto to avoid updating
        const { id, ...updateData } = dto;

        // update user info to database
        try {
            await this.Prisma.users.update({ where: { id }, data: updateData })
        } catch (error) {
            return { success: false, messages: messages.USER_UPDATE_FAILED };
        }
        return { success: true, messages: messages.USER_UPDATED };
    }
}