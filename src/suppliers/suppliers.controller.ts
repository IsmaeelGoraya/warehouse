import { Controller, Get, Post, Patch, Param, Body, Query } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  // Create Supplier
  @Post()
  create(@Body() body) {
    return this.suppliersService.create(body);
  }

  // List Suppliers
  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.suppliersService.findAll(active);
  }

  // Get Supplier Details
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.suppliersService.findOne(id);
  }

  // Update Supplier
  @Patch(':id')
  update(@Param('id') id: number, @Body() body) {
    return this.suppliersService.update(id, body);
  }

  // Deactivate Supplier
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: number) {
    return this.suppliersService.deactivate(id);
  }
}