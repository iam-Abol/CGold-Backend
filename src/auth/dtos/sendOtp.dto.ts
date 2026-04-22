import { IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @IsPhoneNumber('IR')
  phone: string;
}
