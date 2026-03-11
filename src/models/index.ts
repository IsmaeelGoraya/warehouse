import Supplier from '../suppliers/entities/supplier.entity';
import Product from './product.model';
import ProductSupplier from './productSupplier.model';
import PurchaseOrder from './purchaseOrder.model';
import PurchaseOrderItem from './purchaseOrderItem.model';
import InventoryTransaction from './inventoryTransaction.model';

Supplier.hasMany(PurchaseOrder, { foreignKey: 'supplierId' });
PurchaseOrder.belongsTo(Supplier);

PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'purchaseOrderId' });
PurchaseOrderItem.belongsTo(PurchaseOrder);

Product.hasMany(PurchaseOrderItem, { foreignKey: 'productId' });
PurchaseOrderItem.belongsTo(Product);

Product.hasMany(InventoryTransaction, { foreignKey: 'productId' });
InventoryTransaction.belongsTo(Product);

export {
  Supplier,
  Product,
  ProductSupplier,
  PurchaseOrder,
  PurchaseOrderItem,
  InventoryTransaction
};