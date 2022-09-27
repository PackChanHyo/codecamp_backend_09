import { InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class UserInput extends PartialType(User, InputType) {}
