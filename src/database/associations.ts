import Supplier from '../suppliers/entities/supplier.entity';
import Product from '../models/product.model';
import ProductSupplier from '../models/productSupplier.model';
import PurchaseOrder from '../models/purchaseOrder.model';
import PurchaseOrderItem from '../models/purchaseOrderItem.model';
import InventoryTransaction from '../models/inventoryTransaction.model';

Supplier.hasMany(PurchaseOrder, { foreignKey: 'supplierId' });
PurchaseOrder.belongsTo(Supplier);

PurchaseOrder.hasMany(PurchaseOrderItem, { foreignKey: 'purchaseOrderId' });
PurchaseOrderItem.belongsTo(PurchaseOrder);

Product.hasMany(PurchaseOrderItem, { foreignKey: 'productId' });
PurchaseOrderItem.belongsTo(Product);

Product.hasMany(InventoryTransaction, { foreignKey: 'productId' });
InventoryTransaction.belongsTo(Product);