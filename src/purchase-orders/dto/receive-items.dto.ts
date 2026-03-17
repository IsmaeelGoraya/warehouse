import { IsArray, ValidateNested, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ReceiveItem {

  @ApiProperty()
  @IsNumber()
  productId: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;

}

export class ReceiveItemsDto {

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceiveItem)
  items: ReceiveItem[];

}