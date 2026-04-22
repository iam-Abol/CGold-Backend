import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  otps = new Map();
  constructor(
    @InjectRepository(User)
    private userService: UserService,
    private jwt: JwtService,
  ) {}
  async sendOtp(phone: string) {
    const code = this.generateOtp();
    this.otps.set(phone, {
      code,
      expireAt: Date.now() + 1000 * 2 * 60, //2m
    });
    await this.sendSms(phone, code);
    return { success: true };
  }

  generateOtp(length = 6): string {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return randomInt(min, max).toString();
  }
  async sendSms(phone: string, code: string) {
    // TODO: sms api from sms.ir
    console.log('SMS to', phone, 'OTP:', code);
  }
  async verifyOtp(phone: string, code: string) {
    const data = this.otps.get(phone);
    if (!data) return { success: false, message: 'OTP not found' };
    if (data.expires < Date.now())
      return { success: false, message: 'OTP expired' };
    if (data.code !== code) return { success: false, message: 'Invalid code' };
    // TODO: database -> create or update user
    let user = await this.userService.findByPhone(phone);
    if (!user) {
      user = await this.userService.create(phone);
    }
    // TODO: jwt
    return { success: true, token: 'jwt' };
  }

  async generateTokens(user: User) {
    const payload = { sub: user.id, phone: user.phone };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '12h',
    });

    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);

    await this.userService.save(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
