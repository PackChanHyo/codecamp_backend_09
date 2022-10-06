import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserInput } from './dto/productUser.input';
import { UpdateUserInput } from './entities/updateUser.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [User])
  fetchUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchUser(
    @Args('email') email: string, //
    @Context() context: any,
  ) {
    console.log(context.req.user);
    console.log('fetchUser 실행 완료!!');
    return this.usersService.findOne({ email }), 'fetchUser가 실행되었습니다!!';
  }

  @Mutation(() => User)
  async createUser(
    @Args({ name: 'userInput', nullable: true })
    userInput: UserInput,
  ) {
    return this.usersService.create({ userInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async updateUserPwd(
    @Args('pwd') pwd: string,
    @CurrentUser() currentUser: any,
  ) {
    const hashedPassword = await bcrypt.hash(pwd, 10);
    return this.usersService.updatePwd({
      userId: currentUser.sub,
      pwd: hashedPassword,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  async fetchLoginUser(@CurrentUser() currentUser: any) {
    console.log(currentUser);
    return this.usersService.findOne({ email: currentUser.email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteLoginUser(@CurrentUser() currentUser: any) {
    return this.usersService.softDelete({ email: currentUser.email });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update({ userId, updateUserInput });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteUser(@Args('email') email: string) {
    return this.usersService.softDelete({ email });
  }
}
