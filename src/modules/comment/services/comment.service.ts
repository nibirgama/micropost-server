import {
  Injectable
} from '@nestjs/common';

import { CommentDto } from '../controllers/dto/CommentDto';
import { CommentRepository } from '@repositories/comment.repository';
import { User } from '@entities/user.entity';
import { Comment } from '@entities/comment.entity';
import { PostRepository } from '@repositories/post.repository';


@Injectable()
export class CommentService {
  constructor(
    private commentRepository: CommentRepository,
    private postRepository: PostRepository,
    
  ) { }

  async createComment(commentDto: CommentDto, user: User): Promise<Comment> {

    const post = await this.postRepository.getPostByID(commentDto.postId);
    const comment = await this.commentRepository.createComment(commentDto, user, post);

    return comment;
  }

  async getAllCommentsByPostID(postId: number): Promise<Comment[]> {
    const comments = await this.commentRepository.getAllCommentsByPostID(postId);

    return comments;
  }
}
