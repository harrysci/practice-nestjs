
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from './users.entity';
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
  userId: number;
  firstName: string;
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
  @Post('/createUserInfo')
  async createUserInfo(@Query() createUserData:createUserInfoReq): Promise<createUserInfoRes>{
    return await this.UsersService.createUserInfo(createUserData);
  } 

  // @Get('/updateUserName')
  // async updateUserName(@Param('userId')  userId:number,
  // @Param('firstName') firstName: string
  // ): Promise<any>{
  //   //return userId;
  //   return await this.UsersService.updateUserName(userId, firstName);
  // }
  @Put('/updateUserName')
  async updateUserName(@Query() req:updateUserInfoReq ): Promise<updateUserInfoRes>{
    //return req.userId;
    console.log(req.userId);
    console.log(req.firstName);
    return await this.UsersService.updateUserName(req.userId, req.firstName);
  }

  @Delete('/deleteUserName/:firstName')
  async deleteUserName(
    @Param('firstName') firstName: string,
  ): Promise<User> {
    return await this.UsersService.deleteUserName(firstName);
  }


  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoUser(@Req() req:any) {
    
  } 
  @Get('login/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoLoginCallback(@Req() req:any){
    return this.UsersService.kakaoLogin(req);
  }
  @Get('logout')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogout(@Req() req:any){
    return this.UsersService.kakaoLogout(req);
  }
}
