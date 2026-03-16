import { Injectable, NotFoundException } from '@nestjs/common';
import { Op, fn, col } from 'sequelize';

import Product from '../products/entities/product.entity';
import InventoryTransaction from './entities/inventory-transaction.entity';

@Injectable()
export class InventoryService {

  // GET CURRENT INVENTORY FOR ALL PRODUCTS
  async getCurrentInventory() {

    const inventory = await InventoryTransaction.findAll({

      attributes: [
        'productId',
        [fn('SUM', col('quantity')), 'stock']
      ],

      where: {
        transactionType: 'IN'
      },

      group: ['productId']

    });

    return inventory;

  }


  // GET INVENTORY FOR SINGLE PRODUCT
  async getProductInventory(productId: number) {

    const product = await Product.findByPk(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const transactions = await InventoryTransaction.findAll({
      where: { productId }
    });

    let stock = 0;

    for (const tx of transactions) {

      const quantity = tx.getDataValue('quantity');

      if (tx.getDataValue('transactionType') === 'IN') {
        stock += quantity;
      } else {
        stock -= quantity;
      }

    }

    return {
      productId,
      stock
    };

  }


  // GET INVENTORY TRANSACTIONS HISTORY
  async getTransactions(productId: number) {

    const product = await Product.findByPk(productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return InventoryTransaction.findAll({
      where: { productId },
      order: [['created_at', 'DESC']]
    });

  }

}