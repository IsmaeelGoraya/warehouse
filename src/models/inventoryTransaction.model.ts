import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const InventoryTransaction = sequelize.define('InventoryTransaction',{

  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },

  productId:{
    type:DataTypes.INTEGER
  },

  transactionType:{
    type:DataTypes.ENUM('IN','OUT')
  },

  quantity:{
    type:DataTypes.INTEGER
  },

  referenceType:{
    type:DataTypes.STRING
  },

  referenceId:{
    type:DataTypes.INTEGER
  }

},{
  tableName:'inventory_transactions',
  timestamps:true
});

export default InventoryTransaction;