import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadfileService {
    create(file:Express.Multer.File){
        return {
            message: '上传成功',
            url: `http://localhost:3000/${file.path}`
        }
    }
}
