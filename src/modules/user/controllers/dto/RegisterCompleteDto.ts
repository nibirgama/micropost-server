import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class RegisterCompleteDto {
  @IsNotEmpty({ message: 'token_empty' })
  token: string;
  @IsNotEmpty({ message: 'name_empty' })
  name: string;
  @IsNotEmpty({ message: 'password_empty' })
  @MinLength(6, { message: 'password_invalid' })
  password: string;
}
