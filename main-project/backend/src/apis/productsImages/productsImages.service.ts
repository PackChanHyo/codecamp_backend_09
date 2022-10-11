import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductImage } from './entities/productImage.entity';

@Injectable()
export class ProductsImagesService {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>, //
  ) {}

  async updateImg({ productId, url }) {
    // 1. 상품의 id와 해당하는 상품에 들어갈 이미지 목록 보내기

    // 2. 이미지 테이블에서 상품id가 일치하는 데이터를 모두 삭제
    await this.productImageRepository.delete({ productId });
    // 3. 새로운 이미지 url을 가지고 데이터 생성
    const aaa = [];
    for (let i = 0; i < url.length; i++) {
      const reuslt = await this.productImageRepository.save({
        url: url[i],
        mainImg: url[0],
        productId,
      });
      //4.
      aaa.push(reuslt);
    }
    return aaa;
  }
}
