import { Module } from '@nestjs/common';
import { SideMenuService } from './side_menu.service';
import { SideMenuController } from './side_menu.controller';

@Module({
  controllers: [SideMenuController],
  providers: [SideMenuService],
})
export class SideMenuModule {}
