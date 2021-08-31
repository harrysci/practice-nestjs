
import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';


export class getUserListRes {
  id: number;
  firstName: string;
  lastName: string;
  isActive : boolean;
}
export class createUserInfoRes {
  id: number;
  firstName: string;
  lastName: string;
  isActive : boolean;
}
export class createUserInfoReq {
  id: number;
  firstName: string;
  lastName: string;
}
export class updateUserInfoReq {
  id: number;
  firstName: string;
  lastName: string;
  isActive : boolean;
}
export class updateUserInfoRes {
  id: number;
  firstName: string;
  lastName: string;
}
@Controller('users')
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get('/test')
  async test(): Promise<string>{
    return await this.UsersService.test(); 
  }
  /**아이디를 통한 학생정보 조회
   * @name 아이디 조회
   */
  @Get('/getUserList')
  async getUserList(): Promise<getUserListRes[]>{
    return await this.UsersService.getUserList();
  }
  @Post('/createUser/:userId')
  async createUserInfo(@Body() createUserData:createUserInfoReq): Promise<createUserInfoRes>{
    return await this.UsersService.createUserInfo(createUserData);
  } 

  // @Put('/updateUser/:userId')
  // async updateUserInfo(@Param('userId')  userId:number,
  // @Body() updateUserInfo:updateUserInfoReq): Promise<updateUserInfoRes>{
  //   return await this.UsersService.updateUserInfo(userId, updateUserInfo);
  // }




  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoUser(@Req() req:any) {
    
  } 
  @Get('login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(@Req() req:any){
    return this.UsersService.kakaoLogin(req);
  }
}
