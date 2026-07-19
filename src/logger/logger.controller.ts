import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { TradeQueryDto } from './dtos/tradeQuery.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IsProfileComplete } from 'src/auth/guards/isProfileComplete.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('logger')
export class LoggerController {

  constructor(private loggerService: LoggerService) {}
  
  @Get()
  @UseGuards(RolesGuard, IsProfileComplete)
      completeProfile(@Req() req: any, @Body() body: TradeQueryDto) {
        console.log('finding trades');
        return this.loggerService.findTrades(body);
      }
}
