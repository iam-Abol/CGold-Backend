import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { TradeModule } from 'src/trade/trade.module';

@Module({
  providers: [LoggerService],
  controllers: [LoggerController],
  imports: [TradeModule],
})
export class LoggerModule {}
