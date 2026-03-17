import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';

export class UpdateSupplierDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;
  
  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

}