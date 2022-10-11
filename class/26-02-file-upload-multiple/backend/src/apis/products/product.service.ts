import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocaions/entities/productSaleslocation.entity';
import { ProductsTag } from '../productsTags/entities/productTag.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productsSaleslocationRepository: Repository<ProductSaleslocation>,

    @InjectRepository(ProductsTag)
    private readonly productsTagsRepository: Repository<ProductsTag>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['prodcutSaleslocation', 'productCategory', 'productTags'],
    });
  }
  async create({ createProductInput }) {
    // 1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    // ...createProductInput,
    //하나하나 직접 나열하는 방식
    //   name: '마우스',
    //   description: '좋은 마우스',
    //   price: 3000,
    //});
    console.log(createProductInput);
    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;
    // 2-1) 상품 판매 위치 등록
    const result = await this.productsSaleslocationRepository.save({
      ...productSaleslocation,
    });

    // 2-2) 상품태그 등록
    // productTags가 ["#전자제품","#영등포","#컴퓨터"]
    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productsTagsRepository.findOne({
        where: { name: tagname },
      });
      //기존에 태그가 존재한다면
      if (prevTag) {
        temp.push(prevTag);
        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.productsTagsRepository.save({
          name: tagname, // ["#전자제품",'#영등포]
        });
        temp.push(newTag);
      }

      // for문 안에서의 안티패턴(나중에 promise.all로 바꾸기)
    }

    // 2-3) 상품 등록
    const result2 = await this.productsRepository.save({
      ...product,

      //하나하나 직접 나열하는 방식
      // name: createProductInput.name,
      // description: createProductInput.description,
      // price: createProductInput.price,
      productSaleslocation: result, //result 통째로 넣기 vs id만 빼서 넣기 ex,{id: result.id} 프론트에서 등록결과를 saleslocation까지 모두 받을 수 없음
      productCategory: {
        id: productCategoryId,
        // name 까지 받고싶으면?
        // 1) createProductInput에서 productCategoryInput 만들고 name까지 포함시켜서 받아오기,
        // 2) result2를 만들기 전에, prodcutCategoryId를 사용해서 카테고리 name을 조회하고, 그 name을 여기에 포함시키기
      },
      productTags: temp,
    });
    console.log(temp);
    // 4. 최종결과 돌려주기
    return result2; // {id: asd1dsad-adasd, name: "마우스", description: "좋은 마우스", price: 3000}
  }

  async update({ productId, updateProductInput }) {
    // this.productsRepository.create() // 등록을 위한 빈 객체 만들기
    // this.productsRepository.insert() // 결과는 못 받는 등록 방법
    // this.productsRepository.update() // 결과는 못 받는 수정 방법

    // 수정 후 수정되지 않은 다른 결과값까지 모두 받고 싶을 때 사용
    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });
    console.log(myproduct);
    const result = await this.productsRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });

    console.log(result);

    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout) {
      throw new UnauthorizedException('이미 판매 완료 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;
    //
    // 2. 소프트 삭제
    // this.productsRepository.update({ id: productId }, { isDeleted: true });
    //
    // 3. 소프트 삭제 - deletedAt
    // this.productsRepository.update({id: productId}, {deletedAt: new Date() })
    //
    // 4. 소프트 삭제 (TypeORM 제공) - softRemove
    // this.productsRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제 (TypeORM 제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId }); // 다른 컬럼으로도 삭제 가능
    return result.affected ? true : false;
  }
}
