import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SideMenuModule } from './side-menu/side_menu.module';
import { UserAdminModule } from './user_admin/user_admin.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TopBannerModule } from './top-banner/top_banner.module';
import { CategoryBannerModule } from './category-banner/category_banner.module';

@Module({
  imports: [
    PrismaModule, 
    SideMenuModule,
    UserAdminModule,
    UserModule,
    CategoryModule,
    TopBannerModule,
    CategoryBannerModule,
    ConfigModule.forRoot({isGlobal:true}),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
