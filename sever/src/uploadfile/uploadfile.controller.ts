import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UploadfileService } from './uploadfile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  docMulterConfig,
  imgMulterConfig,
  videoMulterConfig,
} from 'src/config/multerConfig';
import { JwtAuthGuard } from 'src/user/guard/jwt.guard';

@Controller('uploadfile')
@ApiTags('uploadfile')
export class UploadfileController {
  constructor(private readonly uploadfileService: UploadfileService) {}

  @Post('img')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '上传图片文件' })
  @UseInterceptors(FileInterceptor('file', imgMulterConfig))
  uploadImg(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.uploadfileService.create(file);
  }

  @Post('avter')
  @ApiOperation({ summary: '上传头像' })
  @UseInterceptors(FileInterceptor('file', imgMulterConfig))
  uploadavterImg(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.uploadfileService.create(file);
  }

  @Post('video')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '上传视频文件' })
  @UseInterceptors(FileInterceptor('file', videoMulterConfig))
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.uploadfileService.create(file);
  }

  @Post('doc')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '上传文档文件' })
  @UseInterceptors(FileInterceptor('file', docMulterConfig))
  uploadDoc(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.uploadfileService.create(file);
  }
}