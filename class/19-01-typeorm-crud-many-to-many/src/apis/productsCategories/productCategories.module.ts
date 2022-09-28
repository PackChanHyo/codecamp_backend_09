import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesResolver } from './productCategories.resolver';
import { ProductsCategoriesService } from './productCategories.servuce';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductsCategoriesResolver, ProductsCategoriesService],
})
export class ProductsCategoriesModule {}
