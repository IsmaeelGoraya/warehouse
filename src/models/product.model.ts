import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Product = sequelize.define('Product', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}, {
  tableName: 'products',
  timestamps: true
});

export default Product;