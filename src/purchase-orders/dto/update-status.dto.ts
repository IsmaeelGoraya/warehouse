import { IsEnum } from 'class-validator';
import { PurchaseOrderStatus } from '../../common/enums/purchase-order-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusDto {
  
  @ApiProperty()
  @IsEnum(PurchaseOrderStatus)
  status: PurchaseOrderStatus;

}