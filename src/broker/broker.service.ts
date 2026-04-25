import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BrokerService {
  constructor(
    private userService: UserService,
    private productService: ProductService,
  ) {}
  async getProductsForBroker(brokerId: string) {
    const id = Number(brokerId);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestException('Invalid brokerId');
    }
    console.log(brokerId);
    const broker = await this.userService.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!broker) throw new NotFoundException('Broker not found');

    return broker.products || [];
  }
}
