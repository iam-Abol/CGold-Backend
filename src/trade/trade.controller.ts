import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dtos/createTrade.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('trade')
@UseGuards(JwtAuthGuard)
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateTradeDto) {
    // console);

    return this.tradeService.createTrade(String(req.user.id), dto);
  }
  @Get('my')
  async getMyTrades(@Req() req: any) {
    return this.tradeService.findAllByUser(String(req.user.id));
  }
}
