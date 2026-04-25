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
  @Get(':brokerId/products')
  getProducts(@Param('brokerId') brokerId: string, @Req() req: any) {
    const loggedInBrokerId = req.user.id;
    console.log(loggedInBrokerId, req.user);
    if (Number(brokerId) !== loggedInBrokerId) {
      throw new ForbiddenException(
        'You are not allowed to access this resource',
      );
    }
    return this.brokerService.getProductsForBroker(brokerId);
  }
}
