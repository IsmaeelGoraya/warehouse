import PurchaseOrder from '../purchase-orders/entities/purchase-order.entity';
import PurchaseOrderItem from '../purchase-orders/entities/purchase-order-item.entity';

PurchaseOrder.hasMany(PurchaseOrderItem, {
  foreignKey: 'purchaseOrderId',
  as: 'items'
});

PurchaseOrderItem.belongsTo(PurchaseOrder, {
  foreignKey: 'purchaseOrderId'
});