import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { messages } from "src/common/messages";
import { CreateSideMenuDto } from './dto/create_side_menu.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { UpdateSideMenuDto } from './dto/update_side_menu.dto';

@Injectable()
export class SideMenuService {
    constructor(private prisma: PrismaService) { }

    /*------ Get all side menus ------*/
    async getAllSideMenu() {
        const menus = await this.prisma.side_menus.findMany();
        if (menus.length <= 0) {
            return { statusCode: 200, messages: messages.SIDE_MENU_LIST_EMPTY }
        }
        return { statusCode: 200, data: menus }
    }

    /*------ create side menus ------*/
    async createSideMenu(createSideMenu: CreateSideMenuDto) {
        //mapping data to DTO
        const dto = plainToInstance(CreateSideMenuDto, createSideMenu, { excludeExtraneousValues: true });
        //validate data in DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error => {
                Object.values(error.constraints || {})
            })
            return { statusCode: 400, messages: messages };
        }
        // insert new menu to db
        try {
            await this.prisma.side_menus.create({ data: dto })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.MENU_CREATION_FAILED }
        }
        return { statusCode: 201, messages: messages.MENU_CREATED }
    }

    /*------ update side menus ------*/
    async updateSideMenu(updateSideMenu: UpdateSideMenuDto) {
        // mapping data to DTO
        const dto = plainToInstance(UpdateSideMenuDto, updateSideMenu, { excludeExtraneousValues: true });
        // validate data in DTO
        const err = await validate(dto);
        if (err.length > 0) {
            const messages = err.flatMap(error => {
                Object.values(error.constraints || {})
            })
            return { statusCode: 400, messages: messages };
        }
        // remove id from dto to avoid updating
        const { id, ...updateData } = dto;
        // update menu to db
        try {
            await this.prisma.side_menus.update({ where: { id }, data: updateData })
        }
        catch (error) {
            return { statusCode: 500, messages: messages.MENU_UPDATE_FAILED }
        }
        return { statusCode: 201, messages: messages.MENU_UPDATED }
    }
}
