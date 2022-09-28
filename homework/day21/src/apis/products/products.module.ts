import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from '../productsCategories/entities/productCategorie.entity';
import { ProductLocal } from '../productsLocals/entities/productLocal.entity';
import { ProductsTag } from '../productsTags/entities/productsTag.entity';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductLocal,
      ProductCategory,
      User,
      ProductsTag,
    ]),
  ],
  providers: [ProductsResolver, ProductsService],
})
export class ProductsModule {}
