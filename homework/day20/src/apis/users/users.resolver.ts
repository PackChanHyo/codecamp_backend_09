import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/productUser.input';
import { UpdateUserInput } from './entities/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  fetchUser(@Args('userId') userId: string) {
    return this.usersService.findOne({ userId });
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'userInput', nullable: true })
    userInput: UserInput,
  ) {
    return this.usersService.create({ userInput });
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update({ userId, updateUserInput });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string) {
    return this.usersService.delete({ userId });
  }
}
