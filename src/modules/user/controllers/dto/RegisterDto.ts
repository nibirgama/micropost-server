import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'email_empty' })
  @IsEmail({}, { message: 'email_invalid' })
  email: string;
  @IsNotEmpty({ message: 'password_empty' })
  password: string;
}
