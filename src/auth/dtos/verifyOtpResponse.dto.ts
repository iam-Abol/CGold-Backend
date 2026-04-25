import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    example: {
      accessToken: 'jwt-access-token',
      refreshToken: 'jwt-refresh-token',
    },
    required: false,
  })
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}
