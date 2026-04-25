import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyOtpDto } from './dtos/verifyOtp.dto';
import { SendOtpDto } from './dtos/sendOtp.dto';
import { RefreshTokenDto } from './dtos/refresh.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VerifyOtpResponseDto } from './dtos/verifyOtpResponse.dto';

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
  @ApiOperation({ summary: 'Verify OTP code and login/register user' })
  @ApiResponse({
    status: 200,
    description: 'OTP verified successfully',
    type: VerifyOtpResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid code or expired OTP',
  })
  verifyOtp(@Body() body: VerifyOtpDto) {
    const { phone, code } = body;
    // console.log('fher');
    return this.authService.verifyOtp(phone, code);
  }

  @Post('refresh')
  @ApiOperation({
    summary: 'Refresh access and refresh tokens',
    description: 'Validates the refresh token and issues a new token pair',
  })
  @ApiBody({
    type: RefreshTokenDto,
    description: 'User ID and refresh token',
  })
  refresh(@Body() { token, userId }: RefreshTokenDto) {
    return this.authService.refresh(userId, token);
  }
}
