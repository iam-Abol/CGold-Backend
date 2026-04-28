import {
  BadRequestException,
  ForbiddenException,
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
import { TradeStatus } from './enums/tradeStatus.enum';

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

    const validBrokers = product.brokers.filter((b) => {
      return (
        (b.role === UserRole.BROKER || b.role === UserRole.ADMIN) && b.isActive
      );
    });

    if (validBrokers.length === 0) {
      throw new BadRequestException(
        'No active broker available for this product',
      );
    }

    const selectedBroker = this.pickRandomBroker(validBrokers);

    const trade = this.tradeRepo.create({
      user,
      broker: selectedBroker,
      product,
      quantity,
    });
    // ToDo interceptor with dto
    return this.tradeRepo.save(trade);
  }

  async findAllByUser(userId: string) {
    const numericId = Number(userId);

    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid user ID');
    }

    return this.tradeRepo.find({
      where: { user: { id: numericId } },
      relations: ['product'],
      order: { createdAt: 'DESC' },
    });
  }
  async findAllByBroker(brokerId: string) {
    const numericId = Number(brokerId);

    if (isNaN(numericId)) {
      throw new BadRequestException('Invalid broker ID');
    }

    return this.tradeRepo.find({
      where: { broker: { id: numericId } },
      relations: ['user', 'product'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(tradeId: string, brokerId: number, status: TradeStatus) {
    const trade = await this.tradeRepo.findOne({
      where: { id: tradeId },
      relations: ['broker'],
    });

    if (!trade) throw new NotFoundException('Trade not found');

    if (trade.expireAt && trade.expireAt.getTime() < Date.now()) {
      throw new BadRequestException('The trade has expired');
    }
    if (trade.broker.id !== brokerId) {
      throw new ForbiddenException(
        'You are not the assigned broker for this trade',
      );
    }

    if (trade.status !== TradeStatus.PENDING)
      throw new BadRequestException('The trade has already been updated');

    const validStatuses = [TradeStatus.APPROVED, TradeStatus.REJECTED];

    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status value');
    }
    trade.status = status;
    await this.tradeRepo.save(trade);

    return {
      message: `Trade status updated successfully to ${status}`,
      trade,
    };
  }
}
