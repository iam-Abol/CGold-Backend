import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class sendOtpDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+98|0)?9\d{9}$/, { message: 'شماره تلفن معتبر نیست' })
  phone: string;
}
