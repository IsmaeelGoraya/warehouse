import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.config';

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem',{

  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },

  purchaseOrderId:{
    type:DataTypes.INTEGER,
    field:'purchase_order_id'
  },

  productId:{
    type:DataTypes.INTEGER,
    field:'product_id'
  },

  orderedQty:{
    type:DataTypes.INTEGER,
    field:'ordered_qty'
  },

  receivedQty:{
    type:DataTypes.INTEGER,
    field:'received_qty',
    defaultValue:0
  },

  price:{
    type:DataTypes.DECIMAL(10,2)
  }

},{
  tableName:'purchase_order_item',
  timestamps:false
});

export default PurchaseOrderItem;