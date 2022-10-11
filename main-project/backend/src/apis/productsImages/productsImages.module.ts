import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from './entities/productImage.entity';
import { ProductsImagesResolver } from './productsImages.resolver';
import { ProductsImagesService } from './productsImages.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      //
      ProductImage,
    ]),
  ],
  providers: [
    ProductsImagesService, //
    ProductsImagesResolver,
  ],
})
export class ProductsImagesModule {}
