import { User } from '@entities/user.entity';
// import { InviteMemberDto } from '@modules/project/controllers/dto/InviteMemberDto';
// import { GetUser } from '@modules/project/decorator/getUser.decorator';
import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Delete
} from '@nestjs/common';
import { CommentService } from '../services/comment.service';
import { GetUser } from '../decorator/getUser.decorator';

import { CommentDto } from "./dto/CommentDto";
import { AuthGuard } from '@nestjs/passport';


@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) { }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @Post('create')
  register(@Body() commentDto: CommentDto, @GetUser() user: User) {
    return this.commentService.createComment(commentDto, user);
  }

  // @UsePipes(ValidationPipe)
  // @Get('/postId')
  // @UseGuards(AuthGuard())
  // getCommentsByPost(@Param('postId') postId: number) {
  //   return this.commentService.getAllCommentsByPostID();
  // }

}
