import { IsArray, ValidateNested, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

class ReceiveItem {

  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

}

export class ReceiveItemsDto {

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceiveItem)
  items: ReceiveItem[];

}