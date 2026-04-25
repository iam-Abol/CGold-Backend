import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductService } from 'src/product/product.service';

@Controller('customer')
@UseGuards(JwtAuthGuard)
export class CustomerController {
  constructor(private productService: ProductService) {}
  @Get('products')
  getProducts() {
    return this.productService.getProduct();
  }
}
