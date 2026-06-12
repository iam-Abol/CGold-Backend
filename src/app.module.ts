import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProductModule } from './product/product.module';
import { BrokerModule } from './broker/broker.module';
import { CustomerModule } from './customer/customer.module';
import { TradeModule } from './trade/trade.module';
import { MarketModule } from './market/market.module';
import { PriceProviderService } from './market/price-provider.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AdminModule,
    ProductModule,
    BrokerModule,
    CustomerModule,
    TradeModule,
    MarketModule,
  ],
  controllers: [AppController],
  providers: [AppService, PriceProviderService],
})
export class AppModule {}
