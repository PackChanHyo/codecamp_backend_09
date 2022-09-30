import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UserInput } from 'src/apis/users/dto/productUser.input';
import { User } from 'src/apis/users/entities/user.entity';
import { UsersService } from 'src/apis/users/users.service';
import { AuthService } from './auth.service';

// interface IOAuthUser {
//   user?: {
//     id: string;
//     email: string;
//     userInput: any;
//     hashedPassword: any;
//   };
// }
interface IOAuthUser {
  user: Pick<User, 'email' | 'pwd' | 'name' | 'phone' | 'id' | 'personal'>;
}

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    // 1. 회원 조회
    let user = await this.userService.findOne({ email: req.user.email });

    // 2. 회원가입이 안되어있다면? 자동 회원가입
    if (!user) {
      const newUser: UserInput = {
        name: req.user.name,
        phone: req.user.phone,
        email: req.user.email,
        personal: req.user.personal,
        pwd: req.user.pwd,
      };
      user = await this.userService.create({
        userInput: newUser,
        hashedPassword: req.user.pwd,
      });
    }

    // 3. 회원가입이 되어있다면? 로그인(refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
