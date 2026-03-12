import { IsEnum } from 'class-validator';
import { PurchaseOrderStatus } from '../../common/enums/purchase-order-status.enum';

export class UpdateStatusDto {

  @IsEnum(PurchaseOrderStatus)
  status: PurchaseOrderStatus;

}