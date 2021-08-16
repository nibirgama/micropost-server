import { NumberAttributeValue } from 'aws-sdk/clients/dynamodbstreams';
import { IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateIf } from 'class-validator';

export class VoteDto {
  @IsNotEmpty({ message: 'postId_empty' })
  postId: number;
  @IsNotEmpty({ message: 'vote_type_empty' })
  voteType: number;
}
