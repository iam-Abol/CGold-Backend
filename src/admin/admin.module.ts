import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { AdminProductsController } from './adminProducts.controller';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [UserModule, AuthModule, ProductModule],
  controllers: [AdminController, AdminProductsController],
  providers: [AdminService],
})
export class AdminModule {}
