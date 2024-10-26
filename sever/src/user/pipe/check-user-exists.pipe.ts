import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserService } from '../service/user.service';

@Injectable()
export class CheckUserExistsPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(value: any) {
    const user = await this.userService.findByLoginId(value.loginId);
    if (!user) {
      return value;
    } else {
      throw new HttpException('该用户已注册', 409);
    }
  }
}
