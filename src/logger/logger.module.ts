import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerController } from './logger.controller';
import { TradeModule } from 'src/trade/trade.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trade } from 'src/trade/entities/trade.entity';

@Module({
  providers: [LoggerService],
  controllers: [LoggerController],
  imports: [TradeModule,
            TypeOrmModule.forFeature([Trade])
  ],
})
export class LoggerModule {}
