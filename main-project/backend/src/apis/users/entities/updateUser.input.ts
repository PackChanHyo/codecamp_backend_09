import { InputType, PartialType } from '@nestjs/graphql';
import { UserInput } from '../dto/productUser.input';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {}
