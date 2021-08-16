import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class CommentDto {
  
  @IsNotEmpty({ message: 'comment_empty' })
  comment: string;
  @IsNotEmpty({ message: 'description_empty' })
  postId: number;
}
