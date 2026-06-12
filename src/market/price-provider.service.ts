import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PriceProviderService {
  async getGoldPrice() {
    const { data } = await axios.get('https://api.gold-api.com/price/XAU');

    return Number(data.price);
  }

  async getSilverPrice() {
    const { data } = await axios.get('https://api.gold-api.com/price/XAG');

    return Number(data.price);
  }
  async getRate(from = 'USD', to = 'IRR') {
    const API_KEY = process.env.EXCHANGERATE_API_KEY;

    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`,
    );
    
    return Number(data.conversion_rates[to]);
  }

  async getUsdToToman() {
    const irr = await this.getRate('USD', 'IRR');
    return irr / 10;
  }
}
