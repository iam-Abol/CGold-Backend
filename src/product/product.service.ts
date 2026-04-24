import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/createProduct.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private userService: UserService,
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
    const { brokerIds, ...updateData } = dto;

    const product = await this.findOne(id);
    if (!product) throw new NotFoundException();

    if (brokerIds) {
      product.brokers = await this.userService.findByIds(
        brokerIds.map((id) => Number(id)),
      );
    }
    Object.assign(product, updateData);
    return this.productRepo.save(product);
  }
  async delete(id: string) {
    return this.productRepo.delete(id);
  }
}
