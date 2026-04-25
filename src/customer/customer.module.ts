import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ProductModule, AuthModule],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
