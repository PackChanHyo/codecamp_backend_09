import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      //   jwtFromRequest: (req) => {
      //     const temp = req.headers.authorization;
      //     const accessToken = temp.toLowerCase().replace('bearer ', '');
      //     return accessToken;
      //   },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
    });
  }

  validate(payload) {
    // 성공한 토큰에 대해서, 로그아웃된 토근인지 레디스에서 확인하기

    console.log(payload); // {email: a@a.com, sub: asdqwd13d1-dad}
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
