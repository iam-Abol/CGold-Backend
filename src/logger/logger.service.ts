import { Injectable } from '@nestjs/common';
import { Trade } from 'src/trade/entities/trade.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { TradeQueryDto } from './dtos/tradeQuery.dto';

@Injectable()
export class LoggerService {
  constructor(
    @InjectRepository(Trade)
    private readonly repo: Repository<Trade>,
  ) {}
  async findTrades(filter: TradeQueryDto) {
    const { userId, brokerId, fromDate, toDate } = filter;
    const query = this.repo.createQueryBuilder('trade');
    if (userId !== undefined) {
      query.andWhere('trade.User.id = :userId', {
        userId,
      });
    }
    if (brokerId !== undefined) {
      query.andWhere('trade.Broker.id = :brokerId', {
        brokerId,
      });
    }
    if (fromDate) {
      query.andWhere('trade.createdAt >= :fromDate', { fromDate });
    }
    if (toDate) {
      query.andWhere('trade.createdAt <= :toDate', { toDate });
    }
    return query.orderBy('trade.createdAt', 'DESC').getMany();
  }
}
