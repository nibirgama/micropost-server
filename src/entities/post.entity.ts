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
import { User } from './user.entity';
import { Vote } from './vote.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  postId: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToOne((type) => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;
  // @OneToMany((type) => Post, (post) => post.user, { onDelete: 'CASCADE' })
  @OneToMany((type) => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  comments: Comment[];
  @OneToMany((type) => Post, (post) => post.votes, { onDelete: 'CASCADE' })
  votes: Vote[];
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;
}
