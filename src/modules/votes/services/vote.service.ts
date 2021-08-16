import {
  Injectable
} from '@nestjs/common';

import { VoteDto } from '../controllers/dto/VoteDto';
import { PostRepository } from '@repositories/post.repository';
import { User } from '@entities/user.entity';
import { VoteRepository } from '@repositories/vote.repository';
import { Vote } from '@entities/vote.entity';


@Injectable()
export class VoteService {
  constructor(
    private postRepository: PostRepository,
    private voteRepository: VoteRepository,
    
  ) { }

  async makeVote(voteDto: VoteDto, user: User): Promise<Vote> {
    const post = await this.postRepository.getPostByID(voteDto.postId);
    const vote = await this.voteRepository.findVote(voteDto, user);

    let newVote;

    if (!vote) {
      newVote = await this.voteRepository.makeVote(voteDto, user, post);
    } else {
      newVote = await this.voteRepository.updateVote(voteDto, user, post, vote);
    }

    // return vote;
    return newVote;
  }
}
