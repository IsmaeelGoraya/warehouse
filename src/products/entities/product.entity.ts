import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database.config';

interface ProductAttributes {
  id: number;
  name: string;
  sku: string;
  description: string;
  isActive: boolean;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id' | 'isActive'>;

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  id!: number;
  name!: string;
  sku!: string;
  description!: string;
  isActive!: boolean;
}

Product.init(
  {
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
      field: 'is_active',
      defaultValue: true
    }
  },
  {
    sequelize,
    tableName: 'product',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Product;