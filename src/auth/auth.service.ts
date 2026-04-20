import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  sendOtp(phone: string) {
    return phone;
  }
}
