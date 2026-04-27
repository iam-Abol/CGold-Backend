import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
