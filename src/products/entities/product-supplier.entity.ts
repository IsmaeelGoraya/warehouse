import { DataTypes } from 'sequelize';
import sequelize from '../../config/database.config';

const ProductSupplier = sequelize.define('ProductSupplier', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  price: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  }

},{
  tableName: 'product_suppliers',
  timestamps: false
});

export default ProductSupplier;