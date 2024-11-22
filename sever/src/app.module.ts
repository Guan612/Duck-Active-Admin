import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ActiveModule } from './active/active.module';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [UserModule, ActiveModule, RegistrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
