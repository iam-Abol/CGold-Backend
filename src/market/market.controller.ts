import { Controller, Post } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private marketService: MarketService) {}

  @Post('seed')
  async seed() {
    return this.marketService.seed();
  }
}
