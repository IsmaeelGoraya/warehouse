import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({summary:'Create a new product'})
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @ApiOperation({summary:'Get all the products'})
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOperation({summary:'Get product with id'})
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({summary:'Update product with id'})
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @ApiOperation({summary:'Deactivate product'})
  @Patch(':id/deactivate')
  deactivate(@Param('id') id: number) {
    return this.productsService.deactivate(id);
  }

}