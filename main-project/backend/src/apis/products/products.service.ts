import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productsCategories/entities/productCategorie.entity';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { ProductLocal } from '../productsLocals/entities/productLocal.entity';
import { ProductsTag } from '../productsTags/entities/productsTag.entity';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,

    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,

    @InjectRepository(ProductLocal)
    private readonly productLocalRepository: Repository<ProductLocal>,

    @InjectRepository(ProductsTag)
    private readonly productTagsRepository: Repository<ProductsTag>, // private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: ['productsCategory', 'productLocal', 'productsTags'],
    });
  }

  findOne({ productId }) {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productsCategory', 'productLocal'],
    });
  }

  async findWithDelete() {
    return await this.productsRepository.find({
      relations: ['productLocal', 'productsCategory'],
      withDeleted: true,
    });
  }

  async create({ createProductInput }) {
    const { productLocal, productCategory, productTags, ...product } =
      createProductInput;

    const result = await this.productLocalRepository.save({
      ...productLocal,
    });
    // console.log(result);
    const result2 = await this.productCategoryRepository.save({
      ...productCategory,
    });

    const temp = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagname = productTags[i].replace('#', '');

      const prevTag = await this.productTagsRepository.findOne({
        where: { name: tagname },
      });
      if (prevTag) {
        temp.push(prevTag);
      } else {
        const newTag = await this.productTagsRepository.save({
          name: tagname,
        });
        temp.push(newTag);
      }
    }

    // const result3 = await this.userRepository.save({
    //   ...user,
    // });
    const result4 = await this.productsRepository.save({
      ...product,
      productLocal: result,
      productsCategory: result2,
      productsTags: temp,
      // user: result3,
    });
    console.log('|||', result4);

    // const aaa = [];
    // for (let i = 0; i < productImage.length; i++) {
    //   aaa.push(productImage[i]);
    //   await this.productImageRepository.save({
    //     url: productImage[i],
    //     mainImg: productImage[0],
    //     product: result4.id,
    //   });

    // await Promise.all(
    //   productImage.map(async (el) => {
    //     await this.productImageRepository.save({
    //       url: el,
    //       mainImg: productImage[0],
    //       product: result4.id,
    //     }); //
    //   }),
    // );

    console.log(temp);
    return result4;
  }

  async update({ productId, updateProductInput }) {
    const myproduct = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const result = await this.productsRepository.save({
      ...myproduct,
      id: productId,
      ...updateProductInput,
    });
    return result;
  }

  async checkSoldout({ productId }) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (product.sale) {
      throw new UnauthorizedException('이미 판매된 상품입니다.');
    }
  }
  async delete({ productId }) {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
  // async Delete({ productId, url }) {
  //   await this.productImageRepository.delete({ productId });
  // }

  async restore({ productId }) {
    const result = await this.productsRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
