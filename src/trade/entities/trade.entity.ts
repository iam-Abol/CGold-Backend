import { User } from 'src/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TradeStatus } from '../enums/tradeStatus.enum';
import { PaymentType } from '../enums/paymentType.enum';

@Entity()
export class Trade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  broker: User;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;

  @Column({
    type: 'enum',
    enum: TradeStatus,
    default: TradeStatus.PENDING,
  })
  status: TradeStatus;

  // @Column({
  //   type: 'enum',
  //   enum: PaymentType,
  // })
  // paymentType: PaymentType;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expireAt: Date;

  @BeforeInsert()
  setExpireAt() {
    const expireMs = 2.5 * 60 * 1000;
    this.expireAt = new Date(Date.now() + expireMs);
  }
}
