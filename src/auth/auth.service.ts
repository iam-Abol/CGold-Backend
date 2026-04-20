import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  otps = new Map();
  async sendOtp(phone: string) {
    const code = this.generateOtp();
    this.otps.set(phone, {
      code,
      expireAt: Date.now() + 1000 * 2 * 60, //2m
    });
    await this.sendSms(phone, code);
    return { success: true };
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  async sendSms(phone: string, code: string) {
    // TODO: sms api from sms.ir
    console.log('SMS to', phone, 'OTP:', code);
  }
  verifyOtp(phone: string, code: string) {
    const data = this.otps.get(phone);
    if (!data) return { success: false, message: 'OTP not found' };
    if (data.expires < Date.now())
      return { success: false, message: 'OTP expired' };
    if (data.code !== code) return { success: false, message: 'Invalid code' };
    // TODO: database -> create or update user
    // TODO: jwt
    return { success: true, token: 'jwt' };
  }
}
