import { Injectable, NotFoundException } from '@nestjs/common';
import Supplier  from './entities/supplier.entity';

@Injectable()
export class SuppliersService {

  // CREATE SUPPLIER
  async create(data: any) {
    const supplier = await Supplier.create(data);
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
  async update(id: number, data: any) {

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    await supplier.update(data);

    return supplier;
  }

  // DEACTIVATE SUPPLIER
  async deactivate(id: number) {

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    await supplier.update({ is_active: false });

    return {
      message: 'Supplier deactivated successfully'
    };
  }

}