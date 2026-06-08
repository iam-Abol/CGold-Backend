import { TradeStatus } from 'src/trade/enums/tradeStatus.enum';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm';
import { User } from './user.entity';
import { Trade } from 'src/trade/entities/trade.entity';


@Entity()
export class tradeLog{
    @PrimaryGeneratedColumn()
    id :number;

    @ManyToOne(() => User)
    userId: User;

    @ManyToOne(() => User)
    brokerId: User;

    @ManyToOne(() => Trade)
    tradeId: Trade;

    @Column({type: "enum", enum : TradeStatus})
    tradeFinalStatus: TradeStatus;

    @Column()
    tradeTimeStamp: string;

    @CreateDateColumn()
    createdAt: Date;
}