import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities/user.entity';
import { Token } from '@models/token.model';
import { UserRepository } from '@repositories/user.repository';

import { AuthenticateDto } from '../controllers/dto/AuthenticateDto';
import { RegisterCompleteDto } from '../controllers/dto/RegisterCompleteDto';
import { RegisterDto } from '../controllers/dto/RegisterDto';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtService
  ) { }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getUserByEmail(email);
    return user;
  }

  async registerUserByEmail(registerDto: RegisterDto): Promise<User> {
    const user = await this.userRepository.registerUserByEmail(registerDto);
    if (user) {
      const token = this.jwt.sign({ email: user.email, id: user.userId });
      console.log(token);
    }
    return user;
  }


  async authenticate(authenticateDto: AuthenticateDto): Promise<Token> {
    if (authenticateDto.grant_type === 'password') {
      const user = await this.userRepository.validateUserPassword(authenticateDto.email, authenticateDto.password);
      if (user) {
        const accessToken = this.jwt.sign(
          {
            email: user.email,
            userId: user.userId,
          },
          { expiresIn: 3600 * 100 },
        );
        const refreshToken = this.jwt.sign(
          {
            email: user.email,
            userId: user.userId,
          },
          { expiresIn: 2592300 },
        );
        return {
          accessToken: accessToken,
          // refreshToken: refreshToken,
        };
      } else {
        throw new UnauthorizedException({
          statusCode: HttpStatus.UNAUTHORIZED,
          message: ['user_password_not_matched'],
        });
      }
    }
    
    else {
      throw new UnauthorizedException({
        statusCode: HttpStatus.UNAUTHORIZED,
        message: ['user_password_not_matched'],
      });
    }
  }

  compareEmail(emailOne, emailTwo) {
    if (emailOne === emailTwo) {
      return true;
    } else {
      return false;
    }
  }


  
}
