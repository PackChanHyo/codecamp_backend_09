import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-google-oauth20';

export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '1048662592243-bhirpffeut6odha2d5uti03tggju1am6.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken, refreshToken, profile) {
    console.log(accessToken); // {email: a@a.com, sub: asdqwd13d1-dad}
    console.log(refreshToken);
    console.log(profile);
    return {
      email: profile.emails[0].value,
      hashedPassword: '1234',
      name: profile.displayName,
      age: 0,
    };
  }
}
