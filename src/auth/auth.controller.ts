import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/send-otp')
  sendOtp(@Body('phone') phone: string) {
    return this.authService.sendOtp(phone);
  }
  @Post('/verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    const { phone, code } = body;
    this.authService.verifyOtp(phone, code);
  }
}
