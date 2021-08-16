import {
  Injectable
} from '@nestjs/common';

import { PostDto } from '../controllers/dto/PostDto';
import { PostRepository } from '@repositories/post.repository';
import { Post } from '@entities/post.entity';
import { User } from '@entities/user.entity';
import { CommentRepository } from '@repositories/comment.repository';
import { Comment } from '@entities/comment.entity';


@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private commentRepository: CommentRepository,
    
  ) { }

  async createPost(postDto: PostDto, user: User): Promise<Post> {
    const post = await this.postRepository.createPost(postDto, user);

    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    const post = await this.postRepository.getAllPosts();

    return post;
  }

  async getPostDetails(postId: number): Promise<Post> {
    const post = await this.postRepository.getPostByID(postId);

    return post;
  }

  async getPostComments(postId: number): Promise<Comment[]> {

    const comments = await this.commentRepository.getAllCommentsByPostID(postId);

    return comments;
  }
}
