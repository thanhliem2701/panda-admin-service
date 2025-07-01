import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class SideMenuService {
    constructor(private prisma: PrismaService) { }

    getAllSideMenu() {
        return this.prisma.side_menus.findMany();
    }
}
