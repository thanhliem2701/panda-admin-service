import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SideMenuService } from './side_menu.service';

@Controller()
export class SideMenuController {
    constructor(private readonly sideMenuService: SideMenuService) { }


}