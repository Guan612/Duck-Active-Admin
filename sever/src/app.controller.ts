import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller() // 注意：@Controller() 为空，表示它处理根级别的路径
export class AppController {
  // ✅ 添加这个方法来实现重定向
  @Get() // 匹配对根路径 "GET /" 的请求
  @ApiOperation({ summary: '静态文件访问' })
  @Redirect('/user', 302) // 当匹配时，发出重定向指令
  root() {
    // 这个方法体可以是空的，因为 @Redirect 装饰器会处理所有逻辑
    // 它不会实际执行并返回任何内容
  }
}
