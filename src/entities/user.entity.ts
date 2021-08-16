import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRegistrationMethod } from './user-registration-method.enum';
import { UserStatus } from './user-status.enum';
import * as bcrypt from 'bcrypt';
// import { Project } from '@entities/project.entity';
// import { Organization } from '@entities/organiztion.entity';
// import { FavouriteProject } from '@entities/favourite-project.entity';
import { Exclude } from 'class-transformer/decorators';
import { classToPlain } from 'class-transformer';
import { Post } from './post.entity';
import { Comment } from './comment.entity';
// import { ProjectMember } from './project-member.entity';
// import { Membership } from './membership.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ unique: true })
  email: string;
  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;
  @Column()
  registrationMethod: UserRegistrationMethod;
  @OneToMany((type) => Post, (post) => post.user, { onDelete: 'CASCADE' })
  posts: Post[];
  @OneToMany((type) => Comment, (post) => post.user, { onDelete: 'CASCADE' })
  comments: Comment[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  createdAt: Date;
  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  toJSON() {
    return classToPlain(this);
  }

  async validatePassword(password: string): Promise<Boolean> {
    return bcrypt.compare(password, this.password);
  }
}
