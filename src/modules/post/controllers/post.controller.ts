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
  Delete,
  Param
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { GetUser } from '../decorator/getUser.decorator';

import { PostDto } from "./dto/PostDto";
import { AuthGuard } from '@nestjs/passport';


@Controller('post')
export class PostController {
  constructor(private postService: PostService) { }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @Post('create')
  create(@Body() postDto: PostDto, @GetUser() user: User) {
    return this.postService.createPost(postDto, user);
  }

  @UsePipes(ValidationPipe)
  @Get('/list')
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @UsePipes(ValidationPipe)
  @Get('/:postId')
  // @UseGuards(AuthGuard())
  getPostDetails(@Param('postId') postId: number) {
    return this.postService.getPostDetails(postId);
  }

  @UsePipes(ValidationPipe)
  @Get('/:postId/comment')
  // @UseGuards(AuthGuard())
  getPostComments(@Param('postId') postId: number) {
    return this.postService.getPostComments(postId);
  }

}
