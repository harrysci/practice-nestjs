import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createUserInfoRes, getUserListRes, updateUserInfoReq, updateUserInfoRes } from './users.controller';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async test(): Promise<string>{
    return 'hello world';
  }
  /**학생 정보 리스트 조회 */
  async getUserList(): Promise<getUserListRes[]>{
    try {
      const userList: getUserListRes[]= await this.userRepository
        .createQueryBuilder('user')
        .getMany();
      return userList
    } catch {
      throw new Error('no student was found');
    }
  }
  async createUserInfo(createUserData): Promise<createUserInfoRes>{
    const userInfo= await this.userRepository.create({
      id:createUserData.userId,
      firstName:createUserData.firstName,
      lastName:createUserData.lastName,
      isActive: true,
    })
    return userInfo;
  }
  // async updateUserInfo(
  //   userId:number, 
  //   updateUserInfo:updateUserInfoReq): Promise<updateUserInfoRes>{
      
  // }

  kakaoLogin(req:any){
    if(!req.user) {
      return new NotFoundException('유저가 없다구요!!!!!');
    }
    return {
      message : '성공하셨습니다!1!1',
      user : req.user,
    };
  }
}
