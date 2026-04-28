import { IsEnum } from 'class-validator';
import { TradeStatus } from '../enums/tradeStatus.enum';

export class UpdateTradeStatusDto {
  @IsEnum(TradeStatus)
  status: TradeStatus;
}
