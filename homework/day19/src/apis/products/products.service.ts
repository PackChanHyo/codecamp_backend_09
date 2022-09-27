import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from '../productsCategories/entities/productCategorie.entity';
import { ProductLocal } from '../productsLocals/entities/productLocal.entity';
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

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.productsRepository.find({
      relations: ['productsCategory', 'productLocal'],
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
    const { productLocal, productCategory, user, ...product } =
      createProductInput;
    const result = await this.productLocalRepository.save({
      ...productLocal,
    });
    // console.log(result);
    const result2 = await this.productCategoryRepository.save({
      ...productCategory,
    });
    console.log(result2);
    const result3 = await this.userRepository.save({
      ...user,
    });
    const result4 = await this.productsRepository.save({
      ...product,
      productLocal: result,
      productsCategory: result2,
      user: result3,
    });
    console.log(result4);
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

  async restore({ productId }) {
    const result = await this.productsRepository.restore({ id: productId });
    return result.affected ? true : false;
  }
}
