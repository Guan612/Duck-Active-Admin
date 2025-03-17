# 第一阶段：构建前端
FROM node:18-alpine as frontend-builder

WORKDIR /app

# 构建管理端前端
COPY front/admin/package.json front/admin/pnpm-lock.yaml ./admin/
RUN cd admin && npm i -g pnpm && pnpm install

COPY front/admin ./admin/
RUN cd admin && pnpm build

# 构建用户端前端
COPY front/user/package.json front/user/pnpm-lock.yaml ./user/
RUN cd user && npm i -g pnpm && pnpm install

COPY front/user ./user/
RUN cd user && pnpm build

# 第二阶段：构建后端
FROM node:18-alpine as backend-builder

WORKDIR /app

COPY sever/package.json sever/pnpm-lock.yaml ./
RUN npm i -g pnpm && pnpm install

COPY sever .
RUN pnpm build

# 第三阶段：生产镜像
FROM node:18-alpine

WORKDIR /app

# 安装Nginx
RUN apk add --no-cache nginx

# 复制前端构建结果
COPY --from=frontend-builder /app/admin/dist /usr/share/nginx/html/admin
COPY --from=frontend-builder /app/user/dist /usr/share/nginx/html/user

# 复制后端构建结果
COPY --from=backend-builder /app/dist ./dist
COPY --from=backend-builder /app/node_modules ./node_modules
COPY sever/prisma ./prisma/

# 配置Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口
EXPOSE 80 3000

# 环境变量配置
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}
ENV JWT_SECRET=${JWT_SECRET}
ENV API_PORT=3000

# 启动服务
CMD sh -c "echo \"DATABASE_URL=$DATABASE_URL\" > .env && \
           echo \"JWT_SECRET=$JWT_SECRET\" >> .env && \
           npx prisma generate && \
           npx prisma migrate deploy && \
           nginx && \
           node dist/main.js"
