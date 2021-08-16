import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class PostDto {
  @IsNotEmpty({ message: 'title_empty' })
  title: string;
  @IsNotEmpty({ message: 'description_empty' })
  description: string;
}
