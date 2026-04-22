import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { sendOtpDto } from './dtos/sendOtp.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/send-otp')
  sendOtp(@Body() { phone }: sendOtpDto) {
    console.log(phone);
    return this.authService.sendOtp(phone);
  }
  @Post('/verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    const { phone, code } = body;
    // console.log('fher');
    return this.authService.verifyOtp(phone, code);
  }
}
