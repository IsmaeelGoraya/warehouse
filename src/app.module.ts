import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ProductsModule } from './products/products.module';
import { PurchaseOrdersModule } from './purchase-orders/purchase-orders.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [SuppliersModule, ProductsModule, PurchaseOrdersModule, InventoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
