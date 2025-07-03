import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SideMenuModule } from './side_menu/side_menu.module';
import { UserAdminModule } from './user_admin/user_admin.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule, 
    SideMenuModule,
    UserAdminModule,
    UserModule,
    ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
