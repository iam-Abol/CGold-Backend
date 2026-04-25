import { ApiProperty } from '@nestjs/swagger';

export class TokensResponseDto {
  @ApiProperty({ example: 'jwt.access.token', description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({
    example: 'jwt.refresh.token',
    description: 'JWT refresh token',
  })
  refreshToken: string;
}
