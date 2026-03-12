import { Injectable, NotFoundException } from '@nestjs/common';
import Supplier  from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {

  // CREATE SUPPLIER
  async create(createSupplierDto: CreateSupplierDto) {
    const supplier = await Supplier.create(createSupplierDto);
      return supplier;
  }

  // LIST SUPPLIERS
  async findAll(active?: boolean) {

    const where: any = {};

    if (active !== undefined) {
      where.is_active = active;
    }

    return Supplier.findAll({ where });
  }

  // GET SINGLE SUPPLIER
  async findOne(id: number) {

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    return supplier;
  }

  // UPDATE SUPPLIER
  async update(id: number, updateSupplierDto: UpdateSupplierDto) {

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    await supplier.update(updateSupplierDto);

    return supplier;
  }

  // DEACTIVATE SUPPLIER
  async deactivate(id: number) {

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    await supplier.update({ isActive: false });

    return {
      message: 'Supplier deactivated successfully'
    };
  }

}