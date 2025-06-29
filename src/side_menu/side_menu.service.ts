import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SideMenuService {
    constructor(private prisma: PrismaService) { }

    //get all menu, no need to try catch, FE will catch errcode
    getAllSideMenu() {
        return this.prisma.side_menus.findMany();
    }
}
