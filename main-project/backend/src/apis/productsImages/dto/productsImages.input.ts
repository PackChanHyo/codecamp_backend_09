import { Field, InputType } from '@nestjs/graphql';
import { Column } from 'typeorm';
import { ProductImage } from '../entities/productImage.entity';

@InputType()
export class ProductsImagesInput {
  @Column()
  @Field(() => [String])
  url: string[];
}
