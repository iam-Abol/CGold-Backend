import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/send-otp')
  sendOtp(@Body('phone') phone: string) {
    return this.authService.sendOtp(phone);
  }
}
