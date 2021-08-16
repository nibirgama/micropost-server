import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { RegisterDto } from './dto/RegisterDto';

describe('user.controller', () => {
  // const registerDto: RegisterDto = {}

  describe('User Registration by Email First Step', () => {
    it('If email is not provided, should say no email', async () => {
      return request('http://localhost:3000/user')
        .post('/register')
        .send({})
        .expect(HttpStatus.BAD_REQUEST)
        .expect(({ body }) => {
          expect(body.statusCode).toBeDefined();
          expect(body.statusCode).toEqual(HttpStatus.BAD_REQUEST);
          expect(body.message.includes('email_empty')).toEqual(true);
          expect(body.message.includes('email_invalid')).toEqual(true);
        });
    });

    // it('If email is invalid, should say invalid', async () => {
    //   userRepository.registerUserByEmail.mockResolvedValue({
    //     statusCode: 400,
    //     message: ["email_invalid"],
    //   });
    //   expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();

    //   const registerDto: RegisterDto = { email: 'asd' };

    //   const result = await userService.registerUserByEmail(registerDto);

    //   expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
    //   expect(result.statusCode).toEqual(400);
    //   expect(result.message.includes('email_empty')).toEqual(false);
    //   expect(result.message.includes('email_invalid')).toEqual(true);
    // });

    // it('If already registered, should say 409 & already_registered', async () => {
    //   userRepository.registerUserByEmail.mockResolvedValue({
    //     statusCode: 409,
    //     message: ['already_registered'],
    //   });
    //   expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();

    //   const registerDto: RegisterDto = { email: 'ahsan.aasim@gmail.com' };

    //   const result = await userService.registerUserByEmail(registerDto);

    //   expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
    //   expect(result.statusCode).toEqual(409);
    //   expect(result.message.includes('already_registered')).toEqual(true);
    // });

    // it('if registration is successful, password should not be returned!', async () => {
    //   userRepository.registerUserByEmail.mockResolvedValue('userObject');
    //   expect(userRepository.registerUserByEmail).not.toHaveBeenCalled();
    //   const registerDto: RegisterDto = { email: 'ahsan.aasim@gmail.com' };
    //   const result = await userService.registerUserByEmail(registerDto);
    //   expect(userRepository.registerUserByEmail).toHaveBeenCalledWith(registerDto);
    //   expect(result).toEqual('userObject');
    // });
  });

  // it ('should aa', () => {
  //     // expect(1).toEqual(1)

  // });
});
