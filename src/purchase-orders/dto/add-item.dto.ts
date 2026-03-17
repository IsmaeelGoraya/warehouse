import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class AddItemDto {

  @ApiProperty()
  @IsNumber()
  productId: number;
  
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;
  
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

}