import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isRFC3339 } from 'class-validator';
import { UserInput } from 'src/apis/users/dto/productUser.input';
import { UsersService } from 'src/apis/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myRefreshKey', expiresIn: '2w' },
    );
    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/;`);

    // 배포환경
    // res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly;`)
    // res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com')
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: 'myAccessKey', expiresIn: '1h' },
    );
  }

  async myLogout({ req }) {
    //
  }

  async mySocialLogin({ req, res }) {
    // 1. 회원 조회
    let user = await this.userService.findOne({ email: req.user.email });

    // if (!req.user.email) {
    //   res.redirect(
    //     'http://localhost:5500/main-project/frontend/login/index.html',
    //   );
    // }

    // 2. 회원가입이 안되어있다면? 자동 회원가입
    if (!user) {
      user = await this.userService.create({
        userInput: req.user,
      });
    }

    // 3. 회원가입이 되어있다면? 로그인(refreshToken, accessToken 만들어서 프론트엔드에 주기)
    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
