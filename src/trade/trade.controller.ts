import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dtos/createTrade.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

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
  @Get('broker')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BROKER)
  async getBrokerTrades(@Req() req) {
    return this.tradeService.findAllByBroker(String(req.user.id));
  }

 
}
