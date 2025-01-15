import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(value: any) {
    // 如果新密码字段不存在，直接返回原值
    if (!value.newPassword) {
      return value;
    }
    
    const password = value.newPassword;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return { 
      ...value, 
      newPassword: hashedPassword,
      password: hashedPassword // 保持向后兼容
    };
  }
}
