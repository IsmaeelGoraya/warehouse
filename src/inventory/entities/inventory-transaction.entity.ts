import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.config';

const InventoryTransaction = sequelize.define('InventoryTransaction',{

  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },

  productId:{
    type:DataTypes.INTEGER,
    field:"product_id"
  },

  transactionType:{
    type:DataTypes.ENUM('IN','OUT'),
    field:"transaction_type"
  },

  quantity:{
    type:DataTypes.INTEGER
  },

  referenceType:{
    type:DataTypes.STRING,
    field:"reference_type"
  },

  referenceId:{
    type:DataTypes.INTEGER,
    field:"reference_id"
  }

},{
  tableName:'inventory_transaction',
  timestamps:true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export default InventoryTransaction;