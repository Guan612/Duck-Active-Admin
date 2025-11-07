import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any) {
    const password = value.password;
    const hashedPassword = await argon2.hash(password);
    return {
      ...value,
      password: hashedPassword, // 保持向后兼容
    };
  }
}
