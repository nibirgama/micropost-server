import { User } from '../entities/user.entity';
import { RegisterDto } from 'modules/user/controllers/dto/RegisterDto';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { PostDto } from '@modules/post/controllers/dto/PostDto';
import { Post } from '@entities/post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
    async createPost(postDto: PostDto, user: User): Promise<Post> {
        const { title, description } = postDto;

        const post = new Post();
        post.title = title;
        post.description = description;
        post.user = user

        try {
            await post.save();
        } catch (error) {

        }
        return post;
    }

    async getAllPosts(): Promise<Post[]> {
        const posts = await getRepository(Post)
            .createQueryBuilder("post")
            .leftJoinAndSelect('post.user', 'user')
            .select(['post.postId', 'post.title', 'post.description', 'user.userId', 'user.email'])
            .getMany()

        return posts;
    }

    async getPostByID(postId: number): Promise<Post> {

        const post = await getRepository(Post)
            .createQueryBuilder("post")
            .leftJoinAndSelect('post.user', 'user')
            .select([
                'post.postId', 'post.title', 'post.description',
                'post.createdAt', 'post.updatedAt', 'user.userId', 'user.email'
            ])
            .where("post.postId = :postId", { postId: postId })
            .getOne()

        return post;
    }

    async getPostWithCommentByPostID(postId: number): Promise<Post> {

        const post = await getRepository(Post)
            .createQueryBuilder("post")
            .leftJoinAndSelect('post.comments', 'comments')
            .leftJoinAndSelect('post.user', 'user')
            // .select([
            //     'post.postId', 'post.title', 'post.description', 'user.userId', 'user.email',
            //     'comments.commentId', 'comments.title'
            // ])
            .where("post.postId = :postId", { postId: postId })
            .getOne()

        return post;
    }

}
