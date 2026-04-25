import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ example: '09120000000' })
  @IsPhoneNumber('IR')
  phone: string;
}
