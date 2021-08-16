import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity()
export class Vote extends BaseEntity {
    @PrimaryGeneratedColumn()
    voteId: number;
    @Column()
    voteType: number;
    @ManyToOne((type) => User, (user) => user.posts, { onDelete: 'CASCADE' })
    user: User;
    @ManyToOne((type) => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date;
}
