import { IsOptional } from "class-validator";

export class TradeQueryDto{
        @IsOptional()
        userId?: number;
      
        @IsOptional()
        brokerId?: number;
      
        @IsOptional()
        fromDate?: string;
      
        @IsOptional()
        toDate?: string;
      
}