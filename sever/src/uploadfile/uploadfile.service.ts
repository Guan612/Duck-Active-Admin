import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadfileService {
  constructor(private readonly configService: ConfigService) {}
  create(file: Express.Multer.File) {
    const filePath = file.path;
    const baseUrl =
      this.configService.get<string>('BASE_URL') || 'http://localhost:3000'; // 你可以设置自己的基础 URL
    const relativeUrl = filePath.replace(/\\/g, '/'); // 将反斜杠替换为斜杠
    const fullUrl = `${baseUrl}/${relativeUrl}`;
    return {
      message: '上传成功',
      url: fullUrl,
    };
  }
}
