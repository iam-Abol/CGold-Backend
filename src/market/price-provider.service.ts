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
}
