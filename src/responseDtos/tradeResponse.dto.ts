import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from './userResponse.dto';
import { ProductResponseDto } from './productResponse.dto';

export class tradeResponseDto {
  @Expose()
  id: string;

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  broker: UserResponseDto;

  @Expose()
  @Type(() => ProductResponseDto)
  product: ProductResponseDto;

  @Expose()
  quantity: number;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  expireAt: Date;
}
