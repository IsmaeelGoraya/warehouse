import { IsNumber } from 'class-validator';

export class CreatePurchaseOrderDto {

  @IsNumber()
  supplierId: number;

}