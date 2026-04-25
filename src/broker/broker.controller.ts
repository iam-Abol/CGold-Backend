import {
  Controller,
  ForbiddenException,
  Get,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BrokerService } from './broker.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/enums/user-role.enum';
import { User } from 'src/entities/user.entity';

@Controller('broker')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.BROKER, UserRole.ADMIN)
export class BrokerController {
  constructor(private brokerService: BrokerService) {}
  @Get('products')
  getProducts(@Req() req: any) {
    return this.brokerService.getProductsForBroker(req.user.id);
  }
}
