import { Module } from '@nestjs/common';
import { MarketService } from './market.service';
import { MarketController } from './market.controller';
import { PriceSchedulerService } from './schedulers/price-scheduler/price-scheduler.service';
import { PriceProviderService } from './price-provider.service';

import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Product])],
  controllers: [MarketController],
  providers: [MarketService, PriceSchedulerService, PriceProviderService],
})
export class MarketModule {}
