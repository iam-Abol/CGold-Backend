import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from './user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const userService = app.get(UserService);

  await userService.createFirstAdmin(process.env.ADMIN_PHONE || '09221024578');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
