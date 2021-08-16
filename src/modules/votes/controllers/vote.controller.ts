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
import { GetUser } from '../decorator/getUser.decorator';

import { VoteDto } from "./dto/VoteDto";
import { AuthGuard } from '@nestjs/passport';
import { VoteService } from '../services/vote.service';
import { bool } from 'aws-sdk/clients/signer';


@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) { }

  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  @Post('/')
  makeVote(@Body() voteDto: VoteDto, @GetUser() user: User) {
    // console.log(voteType, postId);

    return this.voteService.makeVote(voteDto, user);
  }
}
