import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ProductsImagesInput } from './dto/productsImages.input';
import { ProductImage } from './entities/productImage.entity';
import { ProductsImagesService } from './productsImages.service';

@Resolver()
export class ProductsImagesResolver {
  constructor(
    private readonly productsImagesService: ProductsImagesService, //
  ) {}

  @Mutation(() => [ProductImage])
  UpdateImage(
    @Args('productId') productId: string, //
    @Args({ name: 'url', type: () => [String] })
    url: string[],
  ) {
    return this.productsImagesService.updateImg({ productId, url });
  }
}
