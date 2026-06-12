import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PriceProviderService {
  async getGoldPrice() {
    const { data } = await axios.get('https://api.gold-api.com/price/XAU');

    return data.price;
  }

  async getSilverPrice() {
    const { data } = await axios.get('https://api.gold-api.com/price/XAG');

    return data.price;
  }
  async getUsdToToman() {
    const API_KEY = process.env.EXCHANGERATE_API_KEY;

    const { data } = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`,
    );

    const irr = data.conversion_rates.IRR;
    return irr / 10;
  }
}
