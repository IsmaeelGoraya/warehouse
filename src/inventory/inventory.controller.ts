import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('inventory')
export class InventoryController {

  constructor(private readonly inventoryService: InventoryService) {}

  // GET CURRENT INVENTORY
  @ApiOperation({summary:'Get stocks of all products'})
  @Get()
  getCurrentInventory() {
    return this.inventoryService.getCurrentInventory();
  }

  // GET PRODUCT INVENTORY DETAILS
  @ApiOperation({summary:'Get current stock information'})
  @Get(':productId')
  getProductInventory(@Param('productId') productId: number) {
    return this.inventoryService.getProductInventory(productId);
  }

  // GET INVENTORY TRANSACTIONS
  @ApiOperation({summary:'Get stock movement history for the product'})
  @Get(':productId/transactions')
  getTransactions(@Param('productId') productId: number) {
    return this.inventoryService.getTransactions(productId);
  }

}