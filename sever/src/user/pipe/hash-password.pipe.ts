import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  transform(value: any) {
    const password = value.password;
    const salt = bcrypt.genSaltSync(10);
    const newPassword = bcrypt.hashSync(password, salt);
    return { ...value, password: newPassword };
  }
}
