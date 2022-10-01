import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './createProduct.input';

@InputType()
export class UpdateProductInPut extends PartialType(CreateProductInput) {}
// 유틸리티

// PickType(CrateProductInput,['name','price']) => 내가 원하는 것만 보여줘(고르다)
//OmitType(CrateProductInPut,['description']) =>  빼기
//PartialType(CrateProductInput) , ?로 만들고 있어도 되고 없어도 되는 타입(nullable)
