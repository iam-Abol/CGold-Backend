import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumberString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    example: 1,
    description: 'User ID belonging to the refresh token',
  })
  @IsNotEmpty()
  @IsNumberString()
  userId: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Valid refresh token previously issued to the user',
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
