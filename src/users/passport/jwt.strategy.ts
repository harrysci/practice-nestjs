import { Strategy } from 'passport-jwt';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";


const fromUsersCookie = function () {
  return function (request) {
    let token = null;
    if(request && request.cookies) {
      token= request.cookies['Authorization'];
    }
    return token;
  }
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

}
