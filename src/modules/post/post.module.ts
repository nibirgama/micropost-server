import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SharedModule } from '@shared/shared.module';
import { JwtStrategy } from './decorator/jwt.startegy';
import { PostRepository } from '@repositories/post.repository';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { CommentRepository } from '@repositories/comment.repository';
import { VoteRepository } from '@repositories/vote.repository';

@Module({
  imports: [
    // SharedModule,
    TypeOrmModule.forFeature([
      PostRepository,
      CommentRepository,
      VoteRepository
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PassportModule],
})
export class PostModule { }
