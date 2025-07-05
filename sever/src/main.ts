import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('鸭鸭活动管理')
    .setDescription('鸭鸭活动管理API文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe()); // 全局验证

  app.setGlobalPrefix('apis', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  app.useStaticAssets('upload', { prefix: '/upload' });

  await app.enableCors();

  await app.listen(3000);
}
bootstrap();
