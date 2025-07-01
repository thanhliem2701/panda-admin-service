import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserAdminDto } from "./dto/create_user_admin.dto";
import { messages } from "src/common/messages";
import { constantCode } from "src/common/constantCodes";
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateUserAdminDto } from "./dto/update_user_admin.dto";

@Injectable()
export class UserAdminService {
    constructor(
        public Prisma: PrismaService
    ) { }

    /*------ Get all admins ------*/
    async getAllUserAdmins() {
        const user_admins = await this.Prisma.user_admin.findMany({
            where: {
                role: {
                    in: [constantCode.ROLE_ADMIN, constantCode.ROLE_OPERATOR]
                }
            }
        });
        if (!user_admins) {
            return { success: false, messages: messages.ADMIN_LIST_EMPTY }
        }
        const user_admins_without_pw = user_admins.map(({ pw: _, ...user_admin_info }) => user_admin_info);
        return { success: true, data: user_admins_without_pw };
    }

    /*------ Get user admin by id ------*/
    async getAdminById(id: string) {
        const parseIntId = parseInt(id);
        if (!parseIntId) {
            return { success: false, messages: messages.ADMIN_ID_NOT_PROVIDED };
        }
        const user_admin = await this.Prisma.user_admin.findUnique({ where: { id: parseIntId } });
        if (!user_admin) {
            return { success: false, messages: messages.ADMIN_NOT_FOUND };
        }
        const { pw: _, ...user_admin_info } = user_admin;
        return { success: true , data: user_admin_info };
    }

    /*------ Create a new user admin ------*/
    async createNewAdmin(createAdminDto: CreateUserAdminDto) {
        // mapping data to DTO
        const dto = plainToInstance(CreateUserAdminDto, createAdminDto, { excludeExtraneousValues: true });
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
        // insert new admin into database
        try {
            await this.Prisma.user_admin.create({ data: dto })
        } catch (error) {
            return { success: false, messages: messages.ADMIN_CREATION_FAILED };
        }
        return { success: true, messages: messages.ADMIN_CREATED };
    }

    /*------ Update an existing user admin ------*/
    async updateAdminInfo(UpdateAdminDto: UpdateUserAdminDto) {
        // mapping data to DTO
        const dto = plainToInstance(UpdateUserAdminDto, UpdateAdminDto, { excludeExtraneousValues: true });

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

        // insert new admin into database
        try {
            await this.Prisma.user_admin.update({ where: { id }, data: updateData })
        } catch (error) {
            return { success: false, messages: messages.ADMIN_UPDATE_FAILED };
        }
        return { success: true , messages: messages.ADMIN_UPDATED };
    }
}