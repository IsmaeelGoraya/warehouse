import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {

  @ApiProperty({description:'Name of the product'})
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;
  
  @ApiProperty({description:'Product description'})
  @IsString()
  description: string;

}