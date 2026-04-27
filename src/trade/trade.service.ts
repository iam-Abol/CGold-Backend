import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Trade } from './entities/trade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradeDto } from './dtos/createTrade.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepo: Repository<Trade>,

    private productService: ProductService,

    private userService: UserService,
  ) {}
  private pickRandomBroker(brokers: User[]): User {
    const randomIndex = Math.floor(Math.random() * brokers.length);
    return brokers[randomIndex];
  }
}
