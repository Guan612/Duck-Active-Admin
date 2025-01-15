# Duck Active Admin 项目

## 项目概述
Duck Active Admin 是一个活动管理系统，包含管理后台和用户端两个前端应用，以及一个基于NestJS的后端服务。

## 技术栈
### 前端
- 框架：React + TypeScript
- 构建工具：Vite
- UI框架：TailwindCSS
- 状态管理：Zustand
- 路由：React Router

### 后端
- 框架：NestJS
- 数据库：Prisma ORM
- 文件上传：Multer
- 认证：JWT

## 项目结构
```
.
├── front
│   ├── admin       # 管理后台前端
│   └── user        # 用户端前端
└── sever           # 后端服务
```

## 安装与运行
### 前端
1. 进入项目目录
   ```bash
   cd front/admin  # 或 front/user
   ```
2. 安装依赖
   ```bash
   pnpm install
   ```
3. 启动开发服务器
   ```bash
   pnpm dev
   ```

### 后端
1. 进入项目目录
   ```bash
   cd sever
   ```
2. 安装依赖
   ```bash
   pnpm install
   ```
3. 启动开发服务器
   ```bash
   pnpm start:dev
   ```

## API文档
- 后端API文档：http://localhost:3000/api (开发环境)

## 贡献指南
1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request
