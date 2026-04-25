import { Controller, Get, Param } from '@nestjs/common';
import { BrokerService } from './broker.service';

@Controller('broker')
export class BrokerController {
  constructor(private brokerService: BrokerService) {}
  @Get(':brokerId/products')
  getProducts(@Param('brokerId') brokerId: string) {
    return this.brokerService.getProductsForBroker(brokerId);
  }
}
