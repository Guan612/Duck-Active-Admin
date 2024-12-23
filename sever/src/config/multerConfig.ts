import { extname } from 'path';
import { diskStorage } from 'multer';
import { lutimes } from 'fs';
import { HttpException } from '@nestjs/common';

export const imgMulterConfig = {
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (_req, file: Express.Multer.File, cb) => {
    // 限制上传图片类型文件
    if (file.mimetype.match(/(jpg|jpeg|png|gif)$/)) {
      return cb(null, true);
    }
    return cb(new HttpException('上传文件类型不是图片', 400), null);
  },
  storage: diskStorage({
    destination: 'upload/img',
    filename: (_req, file, cb) => {
      const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      // 获取文件后缀
      const suffix = extname(file.originalname);
      return cb(null, `${randomName}${suffix}`);
    }
  })
};


export const videoMulterConfig = {
  limits: {
    fileSize: 1024 * 1024 * 300
  },
  fileFilter: (_req, file: Express.Multer.File, cb) => {
    // 限制上传视频类型文件
    if (file.mimetype.match(/(mp4|avi|mov)$/)) {
      return cb(null, true);
    }

    return cb(new HttpException('上传文件类型不是视频',400), false);
  },
  storage: diskStorage({
    destination: 'upload/video',
    filename: (_req, file, cb) => {
      const randomName = Array(16)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      // 获取文件后缀
      const suffix = extname(file.originalname);
      return cb(null, `${randomName}${suffix}`);
    }
  })
}

export const docMulterConfig = {
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: (_req, file: Express.Multer.File, cb) => {
      // 限制上传文档类型文件
      if (file.mimetype.match(/(doc|docx|pdf)$/)) {
        return cb(null, true);
      }
      return cb(new HttpException('上传文件类型不是文档', 400), false);
    },
    storage: diskStorage({
        destination: 'upload/doc',
        filename: (_req, file, cb) => {
          const randomName = Array(16)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          // 获取文件后缀
          const suffix = extname(file.originalname);
          return cb(null, `${randomName}${suffix}`);
        }
      })
}