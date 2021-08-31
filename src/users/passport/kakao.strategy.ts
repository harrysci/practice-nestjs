import { Injectable } from "@nestjs/common";
import { Strategy, Profile } from 'passport-kakao';
import { PassportStrategy } from "@nestjs/passport";
import { User } from "../users.entity";

@Injectable()
export class Kakaostrategy extends PassportStrategy(Strategy, 'kakao'){
  constructor() {
    super({
      clientID: '04d35cd6f3495d154efb248a6e9cde20',
      clientSecret: '97GQ8VhNfgMiWnb4ZdltiZZfHYwCTlqg',
      callbackURL: 'http://localhost:5000/users/login/kakao/callback',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?:any, info?: any) => void,
  ): Promise<any>{
    console.log(profile);
    const _profile = profile._json;
    const user = { id: _profile.id};
    done(null, user);
  }
}