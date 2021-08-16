import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SharedModule } from '@shared/shared.module';
import { JwtStrategy } from './decorator/jwt.startegy';
import { PostRepository } from '@repositories/post.repository';
import { VoteController } from './controllers/vote.controller';
import { VoteService } from './services/vote.service';
import { VoteRepository } from '@repositories/vote.repository';
import { PostService } from '@modules/post/services/post.service';
import { CommentRepository } from '@repositories/comment.repository';

@Module({
  imports: [
    // SharedModule,
    TypeOrmModule.forFeature([
      VoteRepository,
      PostRepository
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [VoteController],
  providers: [VoteService],
  exports: [PassportModule],
})
export class VoteModule { }
