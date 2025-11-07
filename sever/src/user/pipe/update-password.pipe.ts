import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class UpdatePasswordPipe implements PipeTransform {
  async transform(value: any) {
    if (!value) {
      return {};
    }

    if (value.newpassword) {
      const hashedPassword = await argon2.hash(value.newpassword);
      return {
        ...value,
        password: hashedPassword,
      };
    }

    return value || {};
  }
}
