import { Module } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BrokerController } from './broker.controller';

@Module({
  providers: [BrokerService],
  controllers: [BrokerController]
})
export class BrokerModule {}
