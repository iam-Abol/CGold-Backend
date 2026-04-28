import { IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTradeDto {
  @IsString()
  @IsUUID()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
