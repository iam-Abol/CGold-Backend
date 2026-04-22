import { IsString, Length, IsPhoneNumber } from 'class-validator';

export class VerifyOtpDto {
  @IsPhoneNumber('IR')
  phone: string;

  @IsString()
  @Length(6, 6)
  code: string;
}
