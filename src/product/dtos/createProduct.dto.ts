import {
  IsEnum,
  IsNumber,
  IsString,
  IsArray,
  IsPositive,
} from 'class-validator';
import { MetalType } from '../enums/metalType.enum';
import { PricingType } from '../enums/pricingType.enum';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsEnum(MetalType)
  metalType: MetalType;

  @IsEnum(PricingType)
  pricingType: PricingType;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @IsArray()
  @IsString({ each: true })
  brokerIds: string[];
}
