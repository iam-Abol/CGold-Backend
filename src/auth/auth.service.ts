import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  sendOtp(phone: string) {
    return phone;
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
