import { IsEnum, IsNumber, IsString, IsArray } from 'class-validator';
import { MetalType } from '../enums/metalType.enum';
import { PricingType } from '../enums/pricingType.enum';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(MetalType)
  metalType: MetalType;

  @IsEnum(PricingType)
  pricingType: PricingType;

  @IsNumber()
  price: number;

  @IsArray()
  brokerIds: string[];
}
