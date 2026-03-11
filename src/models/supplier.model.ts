import { DataTypes } from 'sequelize';
import sequelize from '../config/database';

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING
  },

  phone: {
    type: DataTypes.STRING
  },

  address: {
    type: DataTypes.TEXT
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    field: 'is_active',
    defaultValue: true
  }

}, {
  tableName: 'supplier',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Supplier;