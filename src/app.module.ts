import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
// import { SharedModule } from './shared/shared.module';
// import { ProjectModule } from './modules/project/project.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CommentModule } from '@modules/comment/comment.module';
import { VoteModule } from '@modules/votes/votes.module';

@Module({
  imports: [
    // SharedModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        // logging: true,
        synchronize: configService.get('DB_SYNCHRONIZE'),
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
        AWS_REGION: configService.get('AWS_REGION'),
        AWS_ACCESS_KEY_ID: configService.get('AWS_ACCESS_KEY_ID'),
        AWS_SECRET_ACCESS_KEY: configService.get('AWS_SECRET_ACCESS_KEY'),
        AWS_PUBLIC_BUCKET_NAME: configService.get('AWS_SECRET_ACCESS_KEY'),
        apiKey: configService.get('MAILCHIMP_API_KEY'),
        // route: configService.get('ROUTE'),
        // logging: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
    CommentModule,
    VoteModule,
    ScheduleModule.forRoot(),
  ],
  providers: [ConfigService],
})
export class AppModule { }
