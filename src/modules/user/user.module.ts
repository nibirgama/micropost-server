import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@repositories/user.repository';
import { MailSenderService } from '@shared/mail-sender/mail-sender.service';
// import { SharedModule } from '@shared/shared.module';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { JwtStrategy } from './decorator/jwt.startegy';
// import { FileRepository } from '@repositories/file.repository';
import { MulterModule } from '@nestjs/platform-express';
// import { NotificationRepository } from '@repositories/notification.repository';
// import { MembershipRepository } from '@repositories/membership.repository';
// import { ProjectRepository } from '@repositories/project.repository';
// import { MailchimpModule } from '@ntegral/nestjs-mailchimp';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      // FileRepository,
      // NotificationRepository,
      // MembershipRepository,
      // ProjectRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 3600,
      },
    })
    // MailchimpModule.forRoot({
    //   apikey: process.env.MAILCHIMP_API_KEY,
    // }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [PassportModule, JwtStrategy],
})
export class UserModule {}
