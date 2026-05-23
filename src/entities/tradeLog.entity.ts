import { TradeStatus } from 'src/trade/enums/tradeStatus.enum';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';


@Entity()
export class tradeLog{
    @PrimaryGeneratedColumn()
    id :number;

    @Column()
    userId: number;

    @Column()
    brokerId: number;

    @Column()
    tradeId: number;

    @Column({type: "enum", enum : TradeStatus})
    tradeFinalState: TradeStatus;

    @Column()
    createdAt: string;

    @Column()
    tradeTimeStamp: string;
}