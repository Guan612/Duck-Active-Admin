import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../dto/user.dto';
import { userInfo } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginUserDto: LoginUserDto) {
    const user = await this.userService.findByLoginId(LoginUserDto.loginId);
    if (user) {
      const { password, createdAt, updatedAt, ...userInfo } = user;
      if (bcrypt.compareSync(LoginUserDto.password, password)) {
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
