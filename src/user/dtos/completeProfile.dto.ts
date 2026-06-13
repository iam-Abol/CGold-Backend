import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CompleteProfileDto {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  phone: string;
  
}