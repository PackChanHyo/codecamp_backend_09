import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductsCategoriesService } from './productCategories.servuce';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductsCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoriesService.create({ name });
  }
}
