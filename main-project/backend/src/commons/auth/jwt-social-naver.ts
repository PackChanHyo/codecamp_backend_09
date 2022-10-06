import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver-v2';
import 'dotenv-config';
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/login/naver',
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken); // {email: a@a.com, sub: asdqwd13d1-dad}
    return {
      email: profile.email,
      pwd: '1234',
      name: profile.name,
      phone: profile.mobile,
      personal: profile.gender,
    };
  }
}
