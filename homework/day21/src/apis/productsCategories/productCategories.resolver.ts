import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductCategory } from './entities/productCategorie.entity';
import { ProductsCategoriesService } from './productCategories.service';

@Resolver()
export class ProductsCategoriesResolver {
  constructor(
    private readonly productCategoriesService: ProductsCategoriesService,
  ) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('productCategoryId') productCategoryId: string, //
  ) {
    return this.productCategoriesService.create({ productCategoryId });
  }
}
