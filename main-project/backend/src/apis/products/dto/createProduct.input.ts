import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductCategoryInput } from 'src/apis/productsCategories/dto/productCategory.input';
import { ProductsImagesInput } from 'src/apis/productsImages/dto/productsImages.input';
import { ProductLocalInput } from 'src/apis/productsLocals/dto/productLocal.input';
import { UserInput } from 'src/apis/users/dto/productUser.input';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductLocalInput)
  productLocal: ProductLocalInput;

  @Field(() => ProductCategoryInput)
  productCategory: ProductCategoryInput;

  // @Field(() => [ProductsImagesInput])
  // productImage: ProductsImagesInput[];

  // @Field(() => UserInput)
  // userInput: UserInput;

  @Field(() => [String], { nullable: true })
  productTags: string[];
}
