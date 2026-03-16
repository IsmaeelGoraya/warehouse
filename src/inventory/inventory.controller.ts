import { Controller, Get, Param } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {

  constructor(private readonly inventoryService: InventoryService) {}

  // GET CURRENT INVENTORY
  @Get()
  getCurrentInventory() {
    return this.inventoryService.getCurrentInventory();
  }

  // GET PRODUCT INVENTORY DETAILS
  @Get(':productId')
  getProductInventory(@Param('productId') productId: number) {
    return this.inventoryService.getProductInventory(productId);
  }

  // GET INVENTORY TRANSACTIONS
  @Get(':productId/transactions')
  getTransactions(@Param('productId') productId: number) {
    return this.inventoryService.getTransactions(productId);
  }

}