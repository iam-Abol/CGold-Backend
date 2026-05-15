import { Expose, Type } from 'class-transformer';
import { MetalType } from 'src/product/enums/metalType.enum';
import { PricingType } from 'src/product/enums/pricingType.enum';
import { UserResponseDto } from './userResponse.dto';



export class ProductResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  metalType: MetalType;

  @Expose()
  pricingType: PricingType;

  @Expose()
  price: number;

  @Expose()
  @Type(() => UserResponseDto)
  brokers: UserResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
