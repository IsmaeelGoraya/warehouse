import { DataTypes } from 'sequelize';
import sequelize from '../../config/database';

const PurchaseOrder = sequelize.define('PurchaseOrder', {

  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },

  poNumber:{
    type:DataTypes.STRING,
    unique:true
  },

  supplierId:{
    type:DataTypes.INTEGER,
    allowNull:false
  },

  status:{
    type:DataTypes.ENUM(
      'DRAFT',
      'SUBMITTED',
      'PARTIALLY_RECEIVED',
      'RECEIVED'
    ),
    defaultValue:'DRAFT'
  }

},{
  tableName:'purchase_orders',
  timestamps:true
});

export default PurchaseOrder;