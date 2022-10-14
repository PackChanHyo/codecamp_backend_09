import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { stringify } from 'querystring';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInPut } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductsService } from './product.service';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productService: ProductsService, //
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  //
  // GET _search
  // {
  //   "query":{
  //     }
  //   }
  // }
  @Query(() => String)
  async fetchProducts() {
    // 엘라스틱서치에서 조회하기 연습
    const result = await this.elasticsearchService.search({
      index: 'myproduct09',
      query: {
        match_all: {},
      },
    });
    console.log(JSON.stringify(result, null, ' '));

    return '엘라스틱서치에서 조회 완료!';

    // 엘라스틱서치에서 조회 해보기 위해 임시로 주석!!
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => String)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // 엘라스티서치에 등록하기 연습!!
    this.elasticsearchService.create({
      id: 'myid',
      index: 'myproduct09',
      document: {
        name: '훈이',
        age: 13,
        school: '다람쥐초등학교',
        ...createProductInput,
      },
    });

    return '엘라스틱서치에 등록 완료!!';
    // 앨라스틱서치에 등록 해보기 위해 임시로 주석!!
    // return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInPut,
  ) {
    //판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });

    // 수정하기
    return this.productService.update({ productId, updateProductInput });
  }
  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string) {
    return this.productService.delete({ productId });
  }
}
