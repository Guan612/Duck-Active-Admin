import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorator/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // 如果没有定义角色要求，则允许访问
    }

    const { user } = context.switchToHttp().getRequest(); //注意自己的user信息
    if(requiredRoles.some((role) => user.userInfo.role === role)){
      return true;
    } else {
      throw new HttpException('没有权限访问',403);  
    }
  }
}
