import { HttpException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  //颁发token
  async login(LoginUserDto: LoginUserDto) {
    const user = await this.userService.findByLoginId(LoginUserDto.loginId);
    if (user) {
      const { password, createdAt, updatedAt, ...userInfo } = user;
      if (await argon2.verify(LoginUserDto.password, password)) {
        const payload = { userInfo };
        return {
          message: '登录成功',
          userInfo: {
            ...userInfo,
            token: this.jwtService.sign(payload),
          },
        };
      } else {
        throw new HttpException('密码错误', 404);
      }
    } else {
      throw new HttpException('用户还未注册', 404);
    }
  }
}
