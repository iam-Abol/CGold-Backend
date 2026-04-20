import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^(\+98|0)?9\d{9}$/, { message: 'شماره تلفن معتبر نیست' })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 6, { message: 'کد معتبر نیست' })
  code: string;
}
