import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ActiveModule } from './active/active.module';
import { RegistrationModule } from './registration/registration.module';
import { UploadfileModule } from './uploadfile/uploadfile.module';
import { IntegralModule } from './integral/integral.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    ActiveModule,
    RegistrationModule,
    UploadfileModule,
    IntegralModule,
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'client', 'user'),
        serveRoot: '/user',
        // Exclude API routes from being handled by the static file server
        exclude: ['/api/(.*)', '/apis/(.*)'],
      },
      {
        // 指向 admin 应用的打包目录
        rootPath: join(__dirname, '..', 'client', 'admin'),
        // URL 前缀
        serveRoot: '/admin',
        // 建议保留，避免与API冲突
        exclude: ['/api/(.*)','/apis/(.*)'],
      },
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
