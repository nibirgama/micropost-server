import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class AuthenticateDto {
  @ValidateIf((o) => o.grant_type === 'password')
  @IsNotEmpty({ message: 'email_empty' })
  @IsEmail({}, { message: 'email_invalid' })
  email: string;
  @ValidateIf((o) => o.grant_type === 'password')
  @IsNotEmpty({ message: 'password_empty' })
  @MinLength(6, { message: 'password_invalid' })
  password: string;
  @ValidateIf((o) => o.grant_type === 'google')
  @IsNotEmpty({ message: 'idToken_empty' })
  idToken;
  @ValidateIf((o) => o.grant_type === 'refresh')
  @IsNotEmpty({ message: 'token_empty' })
  refreshToken;
  @IsNotEmpty({ message: 'grant_type_empty' })
  grant_type: string;
}
