import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { PriceSchedulerService } from './schedulers/price-scheduler/price-scheduler.service';

@Module({
  providers: [MarketService, PriceSchedulerService],
  controllers: [MarketController]
})
export class MarketModule {}
