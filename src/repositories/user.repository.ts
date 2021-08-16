import {
  HttpStatus,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRegistrationMethod } from '../entities/user-registration-method.enum';
import { UserStatus } from '../entities/user-status.enum';
import { User } from '../entities/user.entity';
import { RegisterDto } from 'modules/user/controllers/dto/RegisterDto';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { ProjectMember } from '@entities/project-member.entity';
// import { MemberType } from '@entities/project-member-type.enum';
// import { Project } from '../entities/project.entity';
// import { MemberStatus } from '@entities/member-status.enum';
import { ResetPasswordDto } from '@modules/user/controllers/dto/ResetPasswordDto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async registerUserByEmail(registerDto: RegisterDto): Promise<User> {
    const { email, password } = registerDto;
    const salt = await bcrypt.genSalt();

    const user = new User();
    user.email = email;
    user.password = await this.hashPassword(password, salt);
    user.registrationMethod = UserRegistrationMethod.DEFAULT;
    // user.status = UserStatus.REGISTRATION_INITIATED;
    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: ['already_registered'],
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ['unknown'],
          error: error,
        });
      }
    }
    return user;
  }

  // async registerUserByGoogle(email, name): Promise<User> {
  //   const user = await this.getUserByEmail(email);
  //   if (user) {
  //     if (user.status === UserStatus.INVITED) {
  //       user.registrationMethod = UserRegistrationMethod.GOOGLE;
  //       user.status = UserStatus.ACTIVE;
  //       await user.save();
  //       return user;
  //     } else {
  //       try {
  //         user.status = UserStatus.ACTIVE;
  //         await user.save();
  //       } catch (error) {
  //         throw new InternalServerErrorException({
  //           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //           message: ['unknown'],
  //           error: error,
  //         });
  //       }
  //       return user;
  //     }
  //   } else {
  //     const user = new User();
  //     user.email = email;
  //     user.name = name;
  //     user.registrationMethod = UserRegistrationMethod.GOOGLE;
  //     user.status = UserStatus.ACTIVE;
  //     try {
  //       await user.save();
  //     } catch (error) {
  //       if (error.code === 'ER_DUP_ENTRY') {
  //         throw new ConflictException({
  //           statusCode: HttpStatus.CONFLICT,
  //           message: ['already_registered'],
  //         });
  //       } else {
  //         throw new InternalServerErrorException({
  //           statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  //           message: ['unknown'],
  //           error: error,
  //         });
  //       }
  //     }
  //     return user;
  //   }
  // }

  async createUser(email: string, name: string, status: UserStatus): Promise<User> {
    const user = new User();
    user.email = email;
    // user.name = name;
    user.registrationMethod = UserRegistrationMethod.UNKNOWN;
    // user.status = status;
    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({
          statusCode: HttpStatus.CONFLICT,
          message: ['already_registered'],
        });
      } else {
        throw new InternalServerErrorException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: ['unknown'],
          error: error,
        });
      }
    }
    return user;
  }

  async getUserByEmail(email: String): Promise<User> {
    if (!email) return null;
    const user = await this.findOne({ where: [{ email: email }] });
    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.findOne({ where: [{ userId: id }] });
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['user_not_found'],
      });
    }
    return user;
  }

  async getUserByVerificationCode(code: String): Promise<User> {
    const user = await this.findOne({ where: [{ verificationCode: code }] });
    return user;
  }

  private async hashPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(email: string, password: string): Promise<User> {
    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['user_not_found'],
      });
    }
    // if (user.registrationMethod !== UserRegistrationMethod.DEFAULT) {
    //   throw new BadRequestException({
    //     statusCode: HttpStatus.BAD_REQUEST,
    //     message: ['registered_with_different_method'],
    //   });
    // }
    if (await user.validatePassword(password)) {
      return user;
    }
    return null;
  }

  // async updateResetCode(user: User, code: string) {
  //   user.verificationCode = code;
  //   await user.save();
  // }

  // async getProjectById(projectId) {
  //   return await Project.findOne({ where: [{ projectId: projectId }] });
  // }

  // async checkDuplicateMember(user: User, project: Project): Promise<boolean> {
  //   if (!user) {
  //     return false;
  //   }
  //   const member = await ProjectMember.findOne({
  //     where: [{ memberId: user, project: project }],
  //   });

  //   console.log(Object.keys(member).length);

  //   if (Object.keys(member).length > 0) {
  //     return false;
  //   }
  //   return true;
  // }

  // async updatePassword(user: User, password: string, confrimPassword: string): Promise<User> {
  //   if (password === confrimPassword) {
  //     const salt = await bcrypt.genSalt();
  //     user.salt = salt;
  //     user.verificationCode = '';
  //     user.password = await this.hashPassword(password, salt);
  //     return await user.save();
  //   } else {
  //     throw new BadRequestException({
  //       statusCode: HttpStatus.BAD_REQUEST,
  //       message: ['password_inconsistency'],
  //     });
  //   }
  // }

  // async resetPassword(user: User, resetPasswordDto: ResetPasswordDto) {
  //   const salt = await bcrypt.genSalt();
  //   user.salt = salt;
  //   user.verificationCode = '';
  //   user.password = await this.hashPassword(resetPasswordDto.newPassword, salt);
  //   return await user.save();
  // }

  // async deleteUser(email: string) {
  //   const data = await this.findOne({
  //     where: [{ email: email }],
  //   });
  //   await data.remove();
  //   return data;
  // }

  // async updateProfilePicture(image, user: User) {
  //   user.profilePicture = image.filepath;
  //   await user.save();
  //   return user;
  // }

  // async deleteAllUser() {
  //   const data = this.find({});
  //   return data;
  // }

  // async findAllUser() {
  //   return this.find({
  //     relations: ['projects'],
  //   });
  // }
}
