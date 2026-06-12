import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceProviderService } from 'src/market/price-provider.service';
import { Product } from 'src/product/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PriceSchedulerService {
  constructor(private readonly provider: PriceProviderService) {}

  @Cron('*/30 * * * * *')
  async updatePrices() {
    const goldOuncePrice = await this.provider.getGoldPrice();
    const silverOuncePrice = await this.provider.getSilverPrice();

    // todo: update db
    console.log(goldOuncePrice, 'gold');
  }
}
