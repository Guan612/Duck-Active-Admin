import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ActiveModule } from './active/active.module';
import { RegistrationModule } from './registration/registration.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';
import { IntegralModule } from './integral/integral.module';

@Module({
  imports: [UserModule, ActiveModule, RegistrationModule, UploadfileModule, IntegralModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
