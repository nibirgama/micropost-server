import { IsEmail, IsNotEmpty } from 'class-validator';

export class ExecutePaymentDto {
  @IsNotEmpty({ message: 'PaymentMethodId_empty' })
  paymentMethodId: number;
}
