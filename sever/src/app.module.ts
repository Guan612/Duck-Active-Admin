import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ActiveModule } from './active/active.module';

@Module({
  imports: [UserModule, ActiveModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
