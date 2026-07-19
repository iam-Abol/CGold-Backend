import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { products } from 'src/product/data/product.data';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}
  async seed() {
    return this.productRepo.save(products);
  }
  async getAll() {
    return this.productRepo.find({});
  }
}
