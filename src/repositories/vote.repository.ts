import { User } from '../entities/user.entity';
import { VoteDto } from 'modules/votes/controllers/dto/VoteDto';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Vote } from '@entities/vote.entity';
import { Post } from '@entities/post.entity';
import { bool } from 'aws-sdk/clients/signer';
import { AnyARecord } from 'dns';

@EntityRepository(Vote)
export class VoteRepository extends Repository<Vote> {

    async makeVote(voteDto: VoteDto, user: User, post: Post): Promise<Vote> {
        const { postId, voteType } = voteDto;
        let vote;
        vote = new Vote();
        
        vote.voteType = voteDto.voteType;
        vote.post = post;
        vote.user = user;

        try {
            await vote.save();
        } catch (error) {
            console.log(error);

        }
        return vote;
    }

    async updateVote(voteDto: VoteDto, user: User, post: Post, vote: Vote): Promise<Vote> {
        const { postId, voteType } = voteDto;
        console.log("zzzzzzzzz", voteDto.voteType);
        
        vote.voteType = voteDto.voteType;
        vote.post = post;
        vote.user = user;

        try {
            await vote.save();
        } catch (error) {
            console.log(error);

        }
        return vote;
    }

    async findVote(voteDto: VoteDto, user: User): Promise<Vote> {
        const { postId, voteType } = voteDto;

        const vote = await getRepository(Vote)
            .createQueryBuilder("vote")
            .leftJoinAndSelect('vote.post', 'post')
            .leftJoinAndSelect('vote.user', 'user')
            // .where("vote.voteId = :postId", { postId: 31 })
            .where("vote.post = postId AND vote.user = userId", { postId: postId, userId: user.userId })
            .getOne()

        return vote;
    }
}
