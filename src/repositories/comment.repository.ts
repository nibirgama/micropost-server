import { User } from '../entities/user.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Comment } from '@entities/comment.entity';
import { CommentDto } from '@modules/comment/controllers/dto/CommentDto';
import { Post } from '@entities/post.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
    async createComment(commentDto: CommentDto, user: User, post: Post): Promise<Comment> {
        const { comment } = commentDto;

        const newComment = new Comment();
        newComment.comment = comment;
        newComment.post = post;
        newComment.user = user;

        try {
            await newComment.save();
        } catch (error) {

        }
        return newComment;
    }

    async getAllCommentsByPostID(postId: number): Promise<Comment[]> {
        const comments = getRepository(Comment)
            .createQueryBuilder("comment")
            .leftJoinAndSelect('comment.post', 'post')
            .leftJoinAndSelect('comment.user', 'user')
            .select(['comment.commentId', 'comment.comment', 'comment.createdAt', 'user.userId', 'user.email'])
            .where("comment.post = :postId", { postId: postId })
            .getMany()

        return comments;
    }

}
