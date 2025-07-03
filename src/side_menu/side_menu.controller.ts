import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SideMenuService } from './side_menu.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class SideMenuController {
    constructor(private readonly sideMenuService: SideMenuService) { }

    // Get all menu
    @MessagePattern('get_all_menus')
    async getAllMenus() {
        return await this.sideMenuService.getAllSideMenu();
    }

    //Create side menu
    @MessagePattern('create_side_menu')
    async createSideMenu(@Body() menu_info: any) {
        return await this.sideMenuService.createSideMenu(menu_info);
    }

    //update side menu
    @MessagePattern('update_side_menu_info')
    async updateSideMenu(@Body() menu_info: any) {
        return await this.sideMenuService.updateSideMenu(menu_info)
    }
}