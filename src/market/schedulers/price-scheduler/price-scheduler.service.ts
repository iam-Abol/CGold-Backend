import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceProviderService } from 'src/market/price-provider.service';
import { Product } from 'src/product/entities/product.entity';
import { MetalType } from 'src/product/enums/metalType.enum';
import { Repository } from 'typeorm';

@Injectable()
export class PriceSchedulerService {
  constructor(
    private readonly provider: PriceProviderService,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  @Cron('*/300 * * * * *')
  async updatePrices() {
    const goldOuncePrice = await this.provider.getGoldPrice();
    const silverOuncePrice = await this.provider.getSilverPrice();
    const usdToToman = await this.provider.getUsdToToman();

    console.log(
      'updating prices: ',
      `Gold : ${goldOuncePrice} silver : ${silverOuncePrice} useToToman : ${usdToToman}`,
    );
    await this.updateProducts(goldOuncePrice, silverOuncePrice, usdToToman);
  }

  private async updateProducts(
    goldOuncePrice: number,
    silverOuncePrice: number,
    usdToToman: number,
  ) {
    const products = await this.productRepo.find();

    const goldPerGramUSD = goldOuncePrice / 31.1034768;
    const silverPerGramUSD = silverOuncePrice / 31.1034768;

    for (const product of products) {
      const marketPrice = this.calculatePrice(
        product,
        goldPerGramUSD,
        silverPerGramUSD,
        usdToToman,
      );

      product.marketPrice = Number(marketPrice.toFixed(0));

      //sample spread
      product.buyPrice = Number((marketPrice * 0.95).toFixed(0));
      product.sellPrice = Number((marketPrice * 1.05).toFixed(0));
    }

    await this.productRepo.save(products);

    console.log(`Updated ${products.length} products`);
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
