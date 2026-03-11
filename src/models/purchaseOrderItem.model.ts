import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const PurchaseOrderItem = sequelize.define('PurchaseOrderItem',{

  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },

  purchaseOrderId:{
    type:DataTypes.INTEGER
  },

  productId:{
    type:DataTypes.INTEGER
  },

  orderedQty:{
    type:DataTypes.INTEGER
  },

  receivedQty:{
    type:DataTypes.INTEGER,
    defaultValue:0
  },

  price:{
    type:DataTypes.DECIMAL(10,2)
  }

},{
  tableName:'purchase_order_items',
  timestamps:false
});

export default PurchaseOrderItem;