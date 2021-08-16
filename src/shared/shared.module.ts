import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
// import { MailSenderService } from './mail-sender/mail-sender.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log(__dirname + '/../../email-templates/');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      // imports: [ConfigModule,],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAILGUN_HOST'),
          port: configService.get('MAILGUN_PORT'),
          ignoreTLS: true,
          secure: false,
          auth: {
            user: configService.get('MAILGUN_INCOMING_USER'),
            pass: configService.get('MAILGUN_INCOMING_PASS'),
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@itcan>',
        },
        preview: true,
        template: {
          dir: __dirname + '/../../email-templates/',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ConfigService],
  exports: [MailerModule],
})
export class SharedModule {}
