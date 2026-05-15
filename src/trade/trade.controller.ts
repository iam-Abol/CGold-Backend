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
import { UpdateTradeStatusDto } from './dtos/updateTradeStatus.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { tradeResponseDto } from 'src/responseDtos/tradeResponse.dto';

@Controller('trade')
@UseGuards(JwtAuthGuard)
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  @Serialize(tradeResponseDto)
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

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.BROKER)
  async updateTradeStatus(
    @Param('id') tradeId: string,
    @Body() dto: UpdateTradeStatusDto,
    @Req() req,
  ) {
    const brokerId = req.user.id;
    return this.tradeService.updateStatus(tradeId, brokerId, dto.status);
  }
}
