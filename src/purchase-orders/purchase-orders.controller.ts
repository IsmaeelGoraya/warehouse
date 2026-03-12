import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { PurchaseOrdersService } from './purchase-orders.service';
import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateStatusDto } from './dto/update-status.dto'
import { ReceiveItemsDto } from './dto/receive-items.dto'

@Controller('purchase-orders')
export class PurchaseOrdersController {

  constructor(private readonly purchaseOrdersService: PurchaseOrdersService) {}

  // CREATE PURCHASE ORDER
  @Post()
  create(@Body() dto: CreatePurchaseOrderDto) {
    return this.purchaseOrdersService.create(dto);
  }

  // ADD ITEM
  @Post(':id/items')
  addItem(
    @Param('id') id: number,
    @Body() dto: AddItemDto
  ) {
    return this.purchaseOrdersService.addItem(id, dto);
  }

  // LIST PURCHASE ORDERS
  @Get()
  findAll() {
    return this.purchaseOrdersService.findAll();
  }

  // GET PURCHASE ORDER DETAILS
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.purchaseOrdersService.findOne(id);
  }

  // UPDATE STATUS
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() dto: UpdateStatusDto
  ) {
    return this.purchaseOrdersService.updateStatus(id, dto.status);
  }

  // RECEIVE ITEMS
  @Post(':id/receive')
  receiveItems(
    @Param('id') id: number,
    @Body() dto: ReceiveItemsDto
  ) {
    return this.purchaseOrdersService.receiveItems(id, dto);
  }

}