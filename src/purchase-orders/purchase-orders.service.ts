import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';

import PurchaseOrder from './entities/purchase-order.entity';
import PurchaseOrderItem from './entities/purchase-order-item.entity';
import Supplier from '../suppliers/entities/supplier.entity';
import Product from '../products/entities/product.entity';
import InventoryTransaction from '../inventory/entities/inventory-transaction.entity';
import { PurchaseOrderStatus } from '../common/enums/purchase-order-status.enum';

import { CreatePurchaseOrderDto } from './dto/create-purchase-order.dto';
import { AddItemDto } from './dto/add-item.dto';
import { ReceiveItemsDto } from './dto/receive-items.dto';

@Injectable()
export class PurchaseOrdersService {

  // CREATE PURCHASE ORDER
  async create(dto: CreatePurchaseOrderDto) {

    const supplier = await Supplier.findByPk(dto.supplierId);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    if (!supplier.getDataValue('isActive')) {
      throw new BadRequestException('Supplier is inactive');
    }

    const poNumber = `PO-${Date.now()}`;

    return PurchaseOrder.create({
      supplierId: dto.supplierId,
      poNumber
    });

  }


  // ADD ITEM TO PURCHASE ORDER
  async addItem(orderId: number, dto: AddItemDto) {

    const order = await PurchaseOrder.findByPk(orderId);

    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }

    const product = await Product.findByPk(dto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return PurchaseOrderItem.create({
      purchaseOrderId: orderId,
      productId: dto.productId,
      orderedQty: dto.quantity,
      price: dto.price
    });

  }


  // LIST PURCHASE ORDERS
  async findAll() {

    return PurchaseOrder.findAll({
      include: [{
        model: PurchaseOrderItem,
        as: 'items'
      }]
    });

  }


  // GET PURCHASE ORDER DETAILS
  async findOne(id: number) {

    const order = await PurchaseOrder.findByPk(id, {
      include: [{
        model: PurchaseOrderItem,
        as: 'items'
      }]
    });

    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }

    return order;

  }


  // UPDATE STATUS
  async updateStatus(id: number, status: PurchaseOrderStatus) {

    const order = await PurchaseOrder.findByPk(id);

    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }

    await order.update({ status });

    return order;

  }


  // RECEIVE ITEMS
  async receiveItems(orderId: number, dto: ReceiveItemsDto) {

    const order = await PurchaseOrder.findByPk(orderId);

    if (!order) {
      throw new NotFoundException('Purchase order not found');
    }

    for (const item of dto.items) {

      const orderItem = await PurchaseOrderItem.findOne({
        where: {
          purchaseOrderId: orderId,
          productId: item.productId
        }
      });

      if (!orderItem) {
        throw new NotFoundException('Order item not found');
      }

      const receivedQty = orderItem.getDataValue('receivedQty') || 0;

      if (receivedQty + item.quantity > orderItem.getDataValue('orderedQty')) {
        throw new BadRequestException('Cannot receive more than ordered quantity');
      }

      await orderItem.update({
        receivedQty: receivedQty + item.quantity
      });

      // CREATE INVENTORY TRANSACTION
      await InventoryTransaction.create({
        productId: item.productId,
        transactionType: 'IN',
        quantity: item.quantity,
        referenceType: 'PURCHASE_ORDER',
        referenceId: orderId
      });

    }

    return {
      message: 'Items received successfully'
    };

  }

}