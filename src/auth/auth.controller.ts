import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { SendOtpDto } from './dtos/sendOtp.dto';
import { RefreshTokenDto } from './dtos/refresh.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/send-otp')
  @ApiOperation({ summary: 'Send otp to user' })
  @ApiResponse({ status: 200, description: '{success: true}' })
  sendOtp(@Body() { phone }: SendOtpDto) {
    return this.authService.sendOtp(phone);
  }
  @Post('/verify-otp')
  verifyOtp(@Body() body: VerifyOtpDto) {
    const { phone, code } = body;
    // console.log('fher');
    return this.authService.verifyOtp(phone, code);
  }
  @Post('refresh')
  refresh(@Body() { token, userId }: RefreshTokenDto) {
    return this.authService.refresh(userId, token);
  }
}
