import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}
  create(dto: CreateProductDto) {
    const product = this.productRepo.create({
      ...dto,
    });

    return this.productRepo.save(product);
  }
  findAll() {
    return this.productRepo.find({ relations: ['brokers'] });
  }
  findOne(id: string) {
    return this.productRepo.findOne({
      where: { id },
      relations: ['brokers'],
    });
  }
  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    if (!product) throw new NotFoundException();
  }
  async delete(id: string) {
    return this.productRepo.delete(id);
  }
}
