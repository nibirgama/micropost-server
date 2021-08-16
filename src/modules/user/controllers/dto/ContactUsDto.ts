import { IsEmail, IsNotEmpty } from 'class-validator';

export class ContactUsDto {
  @IsNotEmpty({ message: 'email_empty' })
  @IsEmail({}, { message: 'email_invalid' })
  email: string;
  @IsNotEmpty({ message: 'name_empty' })
  name: string;
  @IsNotEmpty({ message: 'help_field_empty' })
  shortDescription: string;
  @IsNotEmpty({ message: 'description_field_empty' })
  longDescription: string;
}
