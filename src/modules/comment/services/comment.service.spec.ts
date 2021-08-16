import { HttpStatus, NotFoundException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UserRepository } from '@repositories/user.repository';
import { MailSenderService } from '@shared/mail-sender/mail-sender.service';
// import { SharedModule } from '@shared/shared.module';
import { RegisterCompleteDto } from '../controllers/dto/RegisterCompleteDto';
import { RegisterDto } from '../controllers/dto/RegisterDto';
import { UserModule } from '../user.module';
import { UserService } from './user.service';

describe('Testing User Service', () => {
  let userService;
  let userRepository;
  const mockUserRepository = () => ({
    getUserByEmail: jest.fn(),
    registerUserByEmail: jest.fn(),
  });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        // SharedModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: 3600,
          },
        }),
      ],
      providers: [MailSenderService, UserService, { provide: UserRepository, useFactory: mockUserRepository }],
    }).compile();

    userService = await module.get<UserService>(UserService);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  it('userService should be defined', async () => {
    expect(userService).toBeDefined();
  });

  describe('getUserByEmail', () => {
    it('getUserByEmail should return null if no email is supplied', async () => {
      userRepository.getUserByEmail.mockResolvedValue(null);
      expect(userRepository.getUserByEmail).not.toHaveBeenCalled();
      const result = await userService.getUserByEmail(null);
      expect(userRepository.getUserByEmail).toHaveBeenCalledWith(null);
      expect(result).toEqual(null);
    });
  });

  describe('User Registration by Email First Step', () => {
    it('If email is not provided, should say no email', async () => {
      userRepository.registerUserByEmail.mockResolvedValue({
        statusCode: 400,
        message: ['email_empty', 'email_invalid'],
      });
      expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();

      const registerDto: RegisterDto = { email: '' };

      const result = await userService.registerUserByEmail(registerDto);

      expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
      expect(result.statusCode).toEqual(400);
      expect(result.message.includes('email_empty')).toEqual(true);
      expect(result.message.includes('email_invalid')).toEqual(true);
    });

    it('If email is invalid, should say invalid', async () => {
      userRepository.registerUserByEmail.mockResolvedValue({
        statusCode: 400,
        message: ['email_invalid'],
      });
      expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();

      const registerDto: RegisterDto = { email: 'asd' };

      const result = await userService.registerUserByEmail(registerDto);

      expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
      expect(result.statusCode).toEqual(400);
      expect(result.message.includes('email_empty')).toEqual(false);
      expect(result.message.includes('email_invalid')).toEqual(true);
    });

    it('If already registered, should say 409 & already_registered', async () => {
      userRepository.registerUserByEmail.mockResolvedValue({
        statusCode: 409,
        message: ['already_registered'],
      });
      expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();

      const registerDto: RegisterDto = { email: 'ahsan.aasim@gmail.com' };

      const result = await userService.registerUserByEmail(registerDto);

      expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
      expect(result.statusCode).toEqual(409);
      expect(result.message.includes('already_registered')).toEqual(true);
    });

    it('if registration is successful, password should not be returned!', async () => {
      userRepository.registerUserByEmail.mockResolvedValue('userObject');
      expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();
      const registerDto: RegisterDto = { email: 'ahsan.aasim@gmail.com' };
      const result = await userService.registerUserByEmail(registerDto);
      expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual('userObject');
    });
  });

  describe('User Registration by Email 2nd Step', () => {
    it('If token is invalid, should return 404', async () => {
      await expect(userService.finalizeRegistration({ name: '', token: '', password: '' })).rejects.toThrow(
        NotFoundException,
      );
      await expect(userService.finalizeRegistration({ name: '', token: '12345', password: '' })).rejects.toThrow(
        NotFoundException,
      );
      expect(userRepository.getUserByEmail).not.toHaveBeenCalled();
    });

    it('If token is valid but user not found, should return 404', async () => {
      userRepository.getUserByEmail.mockResolvedValue(null);
      const result = await expect(
        userService.finalizeRegistration({
          name: '',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjZzZW5zZS5taEBnbWFpbC5jb20iLCJpZCI6Niwic3RhdHVzQ29kZSI6IlJFR0lTVFJBVElPTl9JTklUSUFURUQiLCJpYXQiOjE2MDc0MDI5MjEsImV4cCI6MTYwNzQwNjUyMX0.K4-7rCSOtKDLv99J8GTSLz0z5bL-myjJhybxRH27g7Y',
          password: '',
        }),
      ).rejects.toThrow(NotFoundException);
      expect(userRepository.getUserByEmail).toHaveBeenCalled();
      // expect(result).rejects.toThrow(NotFoundException);
    });
  });
});

// {
//   "email": "yasarutsho@gmasdasdasdasdail.com",
//   "registrationMethod": "DEFAULT",
//   "status": "REGISTRATION_INITIATED",
//   "name": null,
//   "password": null,
//   "salt": null,
//   "verificationCode": null,
//   "profilePicture": null,
//   "userId": 39,
//   "createdAt": "2020-12-08T05:36:41.632Z",
//   "updatedAt": "2020-12-08T05:36:41.632Z"
// }
