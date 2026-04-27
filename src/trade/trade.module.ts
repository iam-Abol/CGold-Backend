import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { Trade } from './entities/trade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [TradeService],
  controllers: [TradeController],
  imports: [
    TypeOrmModule.forFeature([Trade]),
    ProductModule,
    UserModule,
    AuthModule,
  ],
})
export class TradeModule {}
