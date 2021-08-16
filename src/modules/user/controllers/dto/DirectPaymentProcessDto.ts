import { IsNotEmpty } from 'class-validator';

export class DirectPaymentProcessDto {
  @IsNotEmpty({ message: 'invoiceKey_empty' })
  invoiceKey: string;
  @IsNotEmpty({ message: 'paymentGatewayId_empty' })
  paymentGatewayId: string;
  @IsNotEmpty({ message: 'cardNumber_empty' })
  cardNumber: string;
  @IsNotEmpty({ message: 'securityCode_empty' })
  securityCode: string;
  @IsNotEmpty({ message: 'expiryMonth_empty' })
  expiryMonth: string;
  @IsNotEmpty({ message: 'expiryYear_empty' })
  expiryYear: string;
  @IsNotEmpty({ message: 'transactionId_empty' })
  transactionId: number;
}
