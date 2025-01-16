import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UpdatePasswordPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return {};
    }

    if (value.newpassword) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(value.newpassword, salt);
      return {
        ...value,
        password: hashedPassword,
      };
    }
    
    return value || {};
  }
}
