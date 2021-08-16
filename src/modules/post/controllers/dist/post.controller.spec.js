'use strict';
exports.__esModule = true;
var common_1 = require('@nestjs/common');
var request = require('supertest');
describe('user.controller', function () {
  var registerDto = { email: 'ahsan.aasim@gmail.com' };
  it('should aa', function () {
    return request('http://localhost:3000/user')
      .post('/register')
      .send(registerDto)
      .expect(common_1.HttpStatus.CONFLICT);
  });
});
