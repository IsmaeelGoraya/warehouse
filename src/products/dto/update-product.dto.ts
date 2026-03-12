import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateProductDto {

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  sku?: string;

  @IsOptional()
  @IsString()
  description?: string;

}