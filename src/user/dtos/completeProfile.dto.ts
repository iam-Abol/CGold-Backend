import { IsNotEmpty } from "class-validator";

export class CompleteProfileDto {

  @IsNotEmpty()
  phone: string;
  
}