import { Injectable, NotFoundException } from '@nestjs/common';
import Product from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  // CREATE PRODUCT
  async create(createProductDto: CreateProductDto) {

    const product = await Product.create(createProductDto);

    return product;
  }

  // LIST PRODUCTS
  async findAll() {

    return Product.findAll();

  }

  // GET PRODUCT BY ID
  async findOne(id: number) {

    const product = await Product.findByPk(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  // UPDATE PRODUCT
  async update(id: number, updateProductDto: UpdateProductDto) {

    const product = await Product.findByPk(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await product.update(updateProductDto);

    return product;
  }

  // DEACTIVATE PRODUCT
  async deactivate(id: number) {

    const product = await Product.findByPk(id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    await product.update({
      isActive: false
    });

    return {
      message: 'Product deactivated successfully'
    };
  }

}