import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database.config';

/* Attributes stored in DB */
interface SupplierAttributes {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
}

/* Attributes allowed when creating */
interface SupplierCreationAttributes
  extends Optional<SupplierAttributes, 'id' | 'isActive'> { }
  
class Supplier
  extends Model<SupplierAttributes, SupplierCreationAttributes>
  implements SupplierAttributes {

  public id!: number;
  public name!: string;
  public email?: string;
  public phone?: string;
  public address?: string;
  public isActive!: boolean;

}

Supplier.init(
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
  },
  {
    sequelize,
    tableName: 'supplier',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default Supplier;