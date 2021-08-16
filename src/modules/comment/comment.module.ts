import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { SharedModule } from '@shared/shared.module';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './services/comment.service';
import { CommentRepository } from '@repositories/comment.repository';
import { PostService } from '@modules/post/services/post.service';
import { PostRepository } from '@repositories/post.repository';

@Module({
  imports: [
    // SharedModule,
    TypeOrmModule.forFeature([
      CommentRepository, PostRepository
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [PassportModule],
})
export class CommentModule { }
