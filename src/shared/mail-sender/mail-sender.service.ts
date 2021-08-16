// import { Project } from '@entities/project.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'entities/user.entity';
import { getMaxListeners } from 'process';
import { ContactUsDto } from '../../modules/user/controllers/dto/ContactUsDto';

@Injectable()
export class MailSenderService {
  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {}

  sendRegistrationInitiatedEmail(email: string, subject: string, token: string) {
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'signup',
        context: {
          code: token,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendRegistrationCompletedEmail(email: string, name: string) {
    const subject = 'Welcome to Itcan';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'signup-completed',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendWarningForStorageLimitEmail(email: string, name: string) {
    const subject = 'Your Itcan account storage is almost full';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'storage-limit-warning',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendForgotPasswordEmail(name: string, email: string, token: string) {
    const subject = 'Reset your password';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'reset-password',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
          code: token,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendForgotPasswordResetSuccessEmail(name: string, email: string) {
    this.sendMail(
      email,
      'Your Itcan password has been successfully changed',
      { base: process.env.CLIENT_BASE_URL, name: name },
      'forgot-password-reset-success',
    );
  }

  passwordResetSuccessfullEmail(email, name) {
    const subject = 'Your password has been updated/reset';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'reset-password-success',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  downgradePlanEmail(email, name) {
    const subject = 'Problems with your Itcan Account - Please read urgently';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'downgrade-plan',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  projectLimitMail(email, name) {
    const subject = 'Your Itcan account project limit is full';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'project-limit',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // async inviteMemberByEmail(
  //   name: string,
  //   email: string,
  //   project: Project,
  //   token: string,
  //   link: string,
  //   senderName: string,
  // ) {
  //   const projectName = project.name;
  //   const userName = name;
  //   const subject = senderName + ' invited you to ' + projectName + ' on itcan';
  //   this.mailerService
  //     .sendMail({
  //       to: email,
  //       from: this.configService.get('FROM_EMAIL'),
  //       subject: subject,
  //       template: 'invite-member-success',
  //       context: {
  //         userName: userName,
  //         projectName: projectName,
  //         token: token,
  //         base: process.env.CLIENT_BASE_URL,
  //         link: link,
  //         senderName: senderName,
  //       },
  //     })
  //     .then(() => {
  //       console.log('mail sent');
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  sendMail(email, subject, data, template) {
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: template,
        context: data,
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendContactUsMail(contactUsDto: ContactUsDto) {
    const email = contactUsDto.email;
    const name = contactUsDto.name;
    const title = contactUsDto.shortDescription;
    const body = contactUsDto.longDescription;

    console.log(this.configService.get('CONTACT_EMAIL'));

    this.mailerService
      .sendMail({
        to: this.configService.get('CONTACT_EMAIL'),
        from: this.configService.get('FROM_EMAIL'),
        subject: 'Itcan - Query from ' + name,
        template: 'contact-us',
        context: {
          name: name,
          body: body,
          title: title,
          email: email,
          base: process.env.CLIENT_BASE_URL,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  paymentSuccessEmail(email, name, path) {
    const subject = 'Transaction with invoice';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'payment-success',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
        },
        attachments: [
          {
            path: path,
            filename: 'invoice.pdf',
          },
        ],
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendWeeklySummaryMail(email, name, dueTask, tasks) {
    // console.log('dueTask', dueTask);
    // console.log('tasks', tasks);

    // console.log('*************');

    // dueTask.forEach((element) => {
    //   console.log('dueTask name', element.name);
    //   console.log('dueTask due date', element.dueDate);
    // });

    // console.log('*************');

    // console.log('*************');

    // dueTask.forEach((element) => {
    //   console.log('overdue name', element.name);
    //   console.log('overdue due date', element.dueDate);
    // });

    // console.log('*************');

    const subject = 'Here’s what’s on your plate';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'weekly-summary',
        context: {
          name: name,
          base: process.env.CLIENT_BASE_URL,
          dueTasks: dueTask,
          tasks: tasks,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sendMailToTaskAssignee(email, name, task) {
    const subject = 'A task has been assigned to you';
    this.mailerService
      .sendMail({
        to: email,
        from: this.configService.get('FROM_EMAIL'),
        subject: subject,
        template: 'task-assignee',
        context: {
          name: name,
          taskName: task.name,
          projectName: task.project.name,
          base: process.env.CLIENT_BASE_URL,
          slug: task.slug,
          projectId: task.project.projectId,
        },
      })
      .then(() => {
        console.log('mail sent');
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
