import { User } from '@entities/user.entity';
// import { InviteMemberDto } from '@modules/project/controllers/dto/InviteMemberDto';
// import { GetUser } from '@modules/project/decorator/getUser.decorator';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Headers,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UserService } from '../services/user.service';
import { AuthenticateDto } from './dto/AuthenticateDto';
import { InvitaionSendingTypeDto } from './dto/InvitaionSendingTypeDto';
import { RegisterCompleteDto } from './dto/RegisterCompleteDto';
import { RegisterDto } from './dto/RegisterDto';
import { ResetForgotDto } from './dto/ResetForgotDto';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { ContactUsDto } from './dto/ContactUsDto';
import { ExecutePaymentDto } from './dto/ExecutePaymentDto';
import { DirectPaymentProcessDto } from './dto/DirectPaymentProcessDto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('authenticate')
  authenticate(@Body() authenticateDto: AuthenticateDto) {
    return this.userService.authenticate(authenticateDto);
  }

  // @UsePipes(ValidationPipe)
  // @Post('register/google')
  // registerUserByGoogle(@Body() authenticateDto: AuthenticateDto) {
  //   return this.userService.registerUserByGoogle(authenticateDto);
  // }

  @UsePipes(ValidationPipe)
  @Post('register')
  register(@Body() regosterDto: RegisterDto) {
    return this.userService.registerUserByEmail(regosterDto);
  }

  // @UsePipes(ValidationPipe)
  // @Post('register/resend')
  // resendRegisterLink(@Body() regosterDto: RegisterDto) {
  //   return this.userService.resendRegisterLink(regosterDto);
  // }

  // @UsePipes(ValidationPipe)
  // @Post('register/complete')
  // registerComplete(@Body() regosterCompleteDto: RegisterCompleteDto) {
  //   return this.userService.finalizeRegistration(regosterCompleteDto);
  // }

  // @UsePipes(ValidationPipe)
  // @Post('forgot-password')
  // forgotPassword(@Body() regosterDto: RegisterDto) {
  //   return this.userService.sendForgetPasswordLink(regosterDto);
  // }

  // @UsePipes(ValidationPipe)
  // @Post('forgot-password/reset')
  // resetForgottenPassword(@Body() resetDto: ResetForgotDto) {
  //   return this.userService.resetForgottenPassword(resetDto);
  // }

  // @Post('invitation')
  // @UseGuards(AuthGuard())
  // invitationForMember(@Body() invitaionSendingTypeDto: InvitaionSendingTypeDto) {
  //   return this.userService.invitaionType(invitaionSendingTypeDto);
  // }

  // @Get('/user-details')
  // @UseGuards(AuthGuard())
  // getUserInformation(@GetUser() user: User) {
  //   return this.userService.getUserInformation(user);
  // }

  // @Get('/profile/storage-summary')
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard())
  // storageSummary(@GetUser() user: User) {
  //   return this.userService.storageSummary(user);
  // }

  // @Put('/profile/reset-password')
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard())
  // resetPassword(@GetUser() user: User, @Body() resetPasswordDto: ResetPasswordDto) {
  //   return this.userService.resetPassword(user, resetPasswordDto);
  // }

  // @Delete('/user-delete/:email')
  // deleteUser(@Param('email') email: string) {
  //   return this.userService.deleteUser(email);
  // }

  // @Post('/contact-us')
  // @UsePipes(ValidationPipe)
  // contactUs(@Body() contactUsDto: ContactUsDto) {
  //   return this.userService.contactUs(contactUsDto);
  // }

  // @Get('/get-campaign-info')
  // @UsePipes(ValidationPipe)
  // getCampaignInfo() {
  //   return this.userService.getCampaignInfo();
  // }

  // @Get('/initial-payment')
  // @UseGuards(AuthGuard())
  // initialPaymentProcess() {
  //   return this.userService.initialPaymentProcess();
  // }

  // @Post('/execute-payment')
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard())
  // executePaymentProcess(@Body() executePaymentDto: ExecutePaymentDto, @GetUser() user: User) {
  //   return this.userService.executePaymentProcess(user, executePaymentDto);
  // }

  // @Post('/direct-payment')
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard())
  // directPaymentProcess(@GetUser() user: User, @Body() directPaymentProcessDto: DirectPaymentProcessDto) {
  //   return this.userService.directPaymentProcess(user, directPaymentProcessDto);
  // }

  // @Post('/downgrade-payment')
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard())
  // downgradePaymentProcess(@GetUser() user: User) {
  //   return this.userService.downgradePaymentProcess(user);
  // }

  // @Get('/get-paymentdetail')
  // @UsePipes(ValidationPipe)
  // @UseGuards(AuthGuard())
  // getPaymentDetail(@GetUser() user: User) {
  //   return this.userService.getPaymentDetail(user);
  // }

  // @Post('/recurring-payment')
  // handleRecurring(@Body() data) {
  //   return this.userService.handleRecurring(data);
  // }
}
