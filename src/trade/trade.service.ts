import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Trade } from './entities/trade.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TradeService {
  constructor(
    @InjectRepository(Trade)
    private tradeRepo: Repository<Trade>,

    private productService: ProductService,

    private userService: UserService,
  ) {}
  
}
