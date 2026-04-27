import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Trade } from './entities/trade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradeDto } from './dtos/createTrade.dto';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/enums/user-role.enum';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepo: Repository<Trade>,

    private productService: ProductService,

    private userService: UserService,
  ) {}
  private pickRandomBroker(brokers: User[]): User {
    /// ToDo -> choose with more balance
    const randomIndex = Math.floor(Math.random() * brokers.length);
    return brokers[randomIndex];
  }
  async createTrade(userId: string, dto: CreateTradeDto) {
    const { productId, quantity } = dto;

    const user = await this.userService.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    const product = await this.productService.findOne(productId);
    if (!product) throw new NotFoundException('Product not found');

    if (!product.brokers || product.brokers.length === 0) {
      throw new BadRequestException('No broker assigned to this product');
    }

    const validBrokers = product.brokers.filter(
      (b) => b.role === UserRole.BROKER,
    );

    if (validBrokers.length === 0) {
      throw new BadRequestException('No valid broker found for this product');
    }

    const selectedBroker = this.pickRandomBroker(validBrokers);

    const trade = this.tradeRepo.create({
      user,
      broker: selectedBroker,
      product,
      quantity,
    });

    return this.tradeRepo.save(trade);
  }
}
