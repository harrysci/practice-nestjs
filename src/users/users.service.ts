import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Repository } from 'typeorm';
import { createUserInfoReq, createUserInfoRes, getUserListRes, updateUserInfoReq, updateUserInfoRes } from './users.controller';
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

  /**유저 정보 리스트 조회 */
  async getUserList(): Promise<getUserListRes[]>{
    console.log('조회');
    try {
      const userList: getUserListRes[]= await this.userRepository
        .createQueryBuilder('user')
        .getMany();
      return userList
    } catch {
      throw new Error('no student was found');
    }
  }

  /** 유저 생성 */
  async createUserInfo(createUserData:createUserInfoReq): Promise<createUserInfoRes>{
    const userInfo:User= await this.userRepository.create({
      firstName:createUserData.firstName,
      lastName:createUserData.lastName,
      isActive: true,
    })
    await this.userRepository.save(userInfo);
    return userInfo;
  }

  /** 유저 이름 수정 */
  async updateUserName(
    userId:number, 
    firstName:string): Promise<updateUserInfoRes>{
      const findUser: User = await this.userRepository.createQueryBuilder('user')
      .where("user.id = :userId", { userId })
      .getOne();
      const UpdateUser: User = {
        id:findUser.id,
        firstName:firstName,
        lastName:findUser.lastName,
        isActive:true,
      }
      await this.userRepository
      .createQueryBuilder('user')
      .update(User)
      .where("user.id = :userId", { userId })
      .set({
        id: findUser.id,
        firstName: firstName,
        lastName: findUser.lastName,
        isActive: true,
      })
      return await UpdateUser;
  }

  /** 유저 정보 삭제 */
  async deleteUserName(firstName: string): Promise<User>{
    console.log(firstName);
      const findUser : User=await this.userRepository.createQueryBuilder('user')
        .where("user.firstName= :firstName",{firstName})
        .getOne();
      if(findUser){
        try{
          await this.userRepository
          .createQueryBuilder('user')
          .delete()
          .where('user.firstName=:firstName',{
            firstName
          })
          .execute();
        } catch {
          throw new Error('deletion Error가 발생해버렸어요~');
        }
      } else {
        throw new Error (
          '해당 유저가 없습니다~~'
        );
      }
      return findUser;
    }
  
  kakaoLogin(req:any){
    console.log(req);
    if(!req.user) {
      return new NotFoundException('유저가 없습니다');
    }
    return {
      message : '성공하셨습니다!1!1',
      user : req.user,
    };
  }
  kakaoLogout(req:any){
    return {
      message : '로그아웃 완료@',
      user : req.user,
    };
  }
}
