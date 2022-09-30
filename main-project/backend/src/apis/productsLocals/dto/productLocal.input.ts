import { InputType, OmitType } from '@nestjs/graphql';
import { ProductLocal } from '../entities/productLocal.entity';

@InputType()
export class ProductLocalInput extends OmitType(
  ProductLocal,
  ['id'],
  InputType,
) {}
