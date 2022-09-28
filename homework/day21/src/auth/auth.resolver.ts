import { UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserInput } from 'src/apis/users/dto/productUser.input';
import { UsersService } from 'src/apis/users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('pwd') pwd: string,
  ) {
    const user = await this.usersService.findOne({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    const isAuth = await bcrypt.compare(pwd, user.pwd);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    return this.authService.getAccessToken({ user });
  }
}
