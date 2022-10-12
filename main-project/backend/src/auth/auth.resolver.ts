import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserInput } from 'src/apis/users/dto/productUser.input';
import { UsersService } from 'src/apis/users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/context';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser } from 'src/commons/auth/gql-user.param';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import exp from 'constants';
@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('pwd') pwd: string,
    @Context() context: IContext,
  ) {
    const user = await this.usersService.findOne({ email });
    //
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    //
    const isAuth = await bcrypt.compare(pwd, user.pwd);
    //
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    //
    this.authService.setRefreshToken({ user, res: context.res });
    //
    return this.authService.getAccessToken({ user });
  }

  @UseGuards()
  @Mutation(() => String)
  async logout(
    @Context() context: IContext, //
  ) {
    try {
      // console.log(context.req.headers);
      const accessToken = await context.req.headers['authorization'].replace(
        'bearer ',
        '',
      );
      const refreshToken = await context.req.headers['cookie'].replace(
        'refreshToken=',
        '',
      );

      jwt.verify(accessToken, 'myAccessKey');
      console.log(jwt.verify(accessToken, 'myAccessKey'));
      console.log('accessToken OK');
      jwt.verify(refreshToken, 'myRefreshKey');
      console.log(jwt.verify(refreshToken, 'myRefreshKey'));
      console.log('refreshToken OK');

      await this.cacheManager.set(`accessToken:${accessToken}`, 'accessToken', {
        ttl: accessToken['exp'],
      });
      // console.log(accToken);
      await this.cacheManager.set(
        `refreshToken:${refreshToken}`,
        'refreshToken',
        {
          ttl: refreshToken['exp'],
        },
      );
      // console.log(refToken);

      return '로그아웃에 성공했습니다.';
    } catch (e) {
      throw new UnauthorizedException('로그아웃을 실패했습니다.');
    }
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(@CurrentUser() currentUser: any) {
    return this.authService.getAccessToken({ user: currentUser });
  }
}
