import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload, GraphQLUpload, Upload } from 'graphql-upload';
import { Repository } from 'typeorm';
import { ProductImage } from '../productsImages/entities/productImage.entity';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@Resolver()
export class ProductsResolver {
  constructor(
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
    private readonly productService: ProductsService,
  ) {}

  @Query(() => [Product])
  fetchProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string) {
    return this.productService.findOne({ productId });
  }

  @Query(() => [Product])
  fetchProductWithDeleted() {
    return this.productService.findWithDelete();
  }
  @Mutation(() => Product)
  async createProduct(
    @Args({ name: 'createProductInput', nullable: true })
    createProductInput: CreateProductInput,
    @Args({ name: 'productsImageInput', type: () => [String] })
    productsImageInput: string[],
  ) {
    const product = await this.productService.create({ createProductInput });
    console.log('|||eeee', product);
    for (let i = 0; i < productsImageInput.length; i++) {
      await this.productImageRepository.save({
        url: productsImageInput[i],
        mainImg: productsImageInput[0],
        product: product.id,
      });
      return product;
    }
  }
  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    await this.productService.checkSoldout({ productId });

    return this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }

  @Mutation(() => Boolean)
  restoreProduct(@Args('productId') productId: string) {
    return this.productService.restore({ productId });
  }
}
