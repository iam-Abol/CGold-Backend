import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceProviderService } from 'src/market/price-provider.service';
import { Product } from 'src/product/entities/product.entity';
import { MetalType } from 'src/product/enums/metalType.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PriceSchedulerService {
  constructor(private readonly provider: PriceProviderService) {}

  @Cron('*/300 * * * * *')
  async updatePrices() {
    const goldOuncePrice = await this.provider.getGoldPrice();
    const silverOuncePrice = await this.provider.getSilverPrice();
    const usdToToman = await this.provider.getUsdToToman();

    // todo: update db
    console.log(usdToToman, 'toman');
  }

  private calculatePrice(
    product: Product,
    goldPerGramUSD: number,
    silverPerGramUSD: number,
    usdToToman: number,
  ) {
    const baseUSD =
      product.metalType === MetalType.GOLD ? goldPerGramUSD : silverPerGramUSD;

    return baseUSD * usdToToman * product.weight * product.purity;
  }
}
