import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(value: any) {
    const password = value.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    return { 
      ...value,
      password: hashedPassword // 保持向后兼容
    };
  }
}
