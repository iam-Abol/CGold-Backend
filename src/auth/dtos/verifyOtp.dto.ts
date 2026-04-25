import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsPhoneNumber } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({ example: '09120000000' })
  @IsPhoneNumber('IR')
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  code: string;
}
