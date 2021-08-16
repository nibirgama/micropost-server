import { IsNotEmpty } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'oldPassword_empty' })
  oldPassword: string;
  @IsNotEmpty({ message: 'newPassword_empty' })
  newPassword: string;
}
