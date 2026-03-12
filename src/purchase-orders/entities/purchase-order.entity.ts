import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../config/database';
import { PurchaseOrderStatus } from '../../common/enums/purchase-order-status.enum';

/* Attributes stored in DB */
interface PurchaseOrderAttributes {
  id: number;
  poNumber: string;
  supplierId: number;
  status: PurchaseOrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

/* Attributes required during creation */
interface PurchaseOrderCreationAttributes
  extends Optional<PurchaseOrderAttributes, 'id' | 'status' | 'createdAt' | 'updatedAt'> {}

class PurchaseOrder
  extends Model<PurchaseOrderAttributes, PurchaseOrderCreationAttributes>
  implements PurchaseOrderAttributes {

  public id!: number;
  public poNumber!: string;
  public supplierId!: number;
  public status!: PurchaseOrderStatus;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

PurchaseOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    poNumber: {
      type: DataTypes.STRING,
      field:"po_number",
      allowNull: false,
      unique: true
    },

    supplierId: {
      type: DataTypes.INTEGER,
      field:"supplier_id",
      allowNull: false
    },

    status: {
      type: DataTypes.ENUM(
        'DRAFT',
        'SUBMITTED',
        'RECEIVED'
      ),
      defaultValue: 'DRAFT'
    }

  },
  {
    sequelize,
    tableName: 'purchase_order',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

export default PurchaseOrder;