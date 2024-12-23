import { Module } from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { UploadfileController } from './uploadfile.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [UploadfileController],
  providers: [UploadfileService,JwtService],
})
export class UploadfileModule {}
