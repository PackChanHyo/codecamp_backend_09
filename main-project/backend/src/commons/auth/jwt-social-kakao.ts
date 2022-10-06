import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIEN_ID,
      clientSecret: process.env.KAKAO_CLIEN_SECRET,
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['gender', 'birthday', 'account_email', 'profile_nickname'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(profile);
    console.log(accessToken);
    console.log(refreshToken); // {email: a@a.com, sub: asdqwd13d1-dad}
    const kakao = profile._json.kakao_account;
    return {
      email: kakao.email,
      pwd: '1234',
      name: profile.username,
      phone: '01011111111',
      personal: kakao.gender,
    };
  }
}
