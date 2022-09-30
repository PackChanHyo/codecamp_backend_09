import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  pwd: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  personal: string;

  @Field(() => String)
  email: string;
}
