import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  // Create Supplier
  @ApiOperation({summary:'Create a new supplier'})
  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.suppliersService.create(createSupplierDto);
  }

  // List Suppliers
  @ApiOperation({summary:'Get list of all the suppliers'})
  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.suppliersService.findAll(active);
  }

  // Get Supplier Details
  @ApiOperation({summary:'Get supplier\'s detail with id'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.suppliersService.findOne(id);
  }

  // Update Supplier
  @ApiOperation({summary:'Update supplier with id'})
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  // Deactivate Supplier
  @ApiOperation({summary:'Deactivate a supplier'})
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: number) {
    return this.suppliersService.deactivate(id);
  }
}