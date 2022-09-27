import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { ProductCategory } from '../entities/productCategorie.entity';

@InputType()
export class ProductCategoryInput extends OmitType(
  ProductCategory,
  ['name'],
  InputType,
) {}
