import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty()
  @IsNumberString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
