import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSaleslocaions/entities/productSaleslocation.entity';
import { ProductsTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './entities/product.subsriber';
import { ProductsResolver } from './product.resolver';
import { ProductsService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductsTag,
    ]),
  ],
  providers: [ProductsResolver, ProductsService, ProductSubscriber],
})
export class ProductsModule {}
