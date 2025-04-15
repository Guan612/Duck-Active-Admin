import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto, LoginUserDto, Role, UpdateUserDto } from './dto/user.dto';
import { HashPasswordPipe } from './pipe/hash-password.pipe';
import { UpdatePasswordPipe } from './pipe/update-password.pipe';
import { CheckUserExistsPipe } from './pipe/check-user-exists.pipe';
import {
  ApiBasicAuth,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './service/auth.service';
import { JwtAuthGuard } from './guard/jwt.guard';
import { RoleGuard } from './guard/role.guard';
import { Roles } from './decorator/roles.decorator';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @ApiResponse({
    status: 201,
    description: '创建用户成功',
    schema: {
      example: {
        loginId: 'snmqwq',
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: '用户已注册',
    schema: {
      example: {
        statusCode: 409,
        message: '该用户已注册',
      },
    },
  })
  async create(
    @Body(CheckUserExistsPipe, HashPasswordPipe) createUserDto: CreateUserDto,
  ) {
    const res = await this.userService.findByLoginId(createUserDto.loginId);
    if (res) {
      throw new HttpException('用户已存在', 409);
    }
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiResponse({
    status: 201,
    description: '登陆成功',
    schema: {
      example: {
        message: '登录成功',
        userInfo: {
          id: 2,
          loginId: 'ninzai',
          nickname: '宁崽',
          role: 1,
          headerimg: null,
          email: null,
          token: 'xxxxxxx',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '用户密码错误',
    schema: {
      example: {
        statusCode: 404,
        message: '用户密码错误',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '用户不存在',
    schema: {
      example: {
        statusCode: 404,
        message: '用户不存在',
      },
    },
  })
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('adminLogin')
  @ApiOperation({ summary: '管理员登录' })
  @ApiResponse({
    status: 201,
    description: '登录成功',
    schema:{
      example:{
        "message": "登录成功",
        "userInfo": {
            "id": 2,
            "loginId": "jiqiren",
            "nickname": "机器人协会",
            "role": 1,
            "headerimg": null,
            "email": null,
            "token": "xxxxxx"
        }
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: '该用户不是管理员',
    schema: {
      example: {
        statusCode: 403,
        message: '该用户不是管理员',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: '密码错误',
    schema: {
      example:{
        statusCode: 404,
        message: '密码错误',
      }
    }
  })
  async adminLogin(@Body() loginDto: LoginUserDto) {
    const res = await this.userService.findByLoginId(loginDto.loginId);
    if (res) {
      if (res.role != 0) {
        return this.authService.login(loginDto);
      } else {
        throw new HttpException('该用户不是管理员', 403);
      }
    } else {
      throw new HttpException('用户不存在', 404);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Teacher, Role.Admin)
  @ApiOperation({ summary: '获取用户列表' })
  @ApiBearerAuth()//添加token验证
  @ApiResponse({
    status: 200,
    description: '获取用户列表成功',
    schema: {
      example: 
        [
          {
              "id": 1,
              "loginId": "yaya",
              "nickname": null,
              "role": 3,
              "headerimg": null,
              "email": null
          },
          {
              "id": 2,
              "loginId": "snmqwq",
              "nickname": "尚凝梦",
              "role": 1,
              "headerimg": null,
              "email": null
          },
        ]
    }
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取单个用户信息' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: '获取用户信息成功',
    schema: {
      example: {
        "id": 2,
        "loginId": "snmqwq",
        "nickname": "尚凝梦",
        "role": 1,
        "headerimg": null,
        "email": null
      }
    }
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '更新用户信息' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: '更新用户信息成功',
    schema: {
      example: {
        "id": 2,
        "loginId": "snmqwq",
        "nickname": "尚凝梦",
        "role": 1,
      }
    }
  })
  async update(
    @Param('id') id: string,
    @Body(UpdatePasswordPipe) updateUserDto: UpdateUserDto,
  ) {
    // 如果有密码修改
    if (updateUserDto.oldPassword && updateUserDto.newPassword) {
      // 验证旧密码
      const user = await this.userService.findOne(+id);
      try {
        await this.authService.login({
          loginId: user.loginId,
          password: updateUserDto.oldPassword
        });
      } catch (error) {
        throw new HttpException('旧密码验证失败', 401);
      }

      // 确保新密码和确认密码一致
      if (updateUserDto.newPassword !== updateUserDto.confirmPassword) {
        throw new HttpException('新密码和确认密码不一致', 400);
      }

      // 只保留新密码
      updateUserDto.password = updateUserDto.newPassword;
    }

    // 移除不需要的字段
    delete updateUserDto.oldPassword;
    delete updateUserDto.newPassword;
    delete updateUserDto.confirmPassword;

    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.Admin,Role.Teacher)
  @ApiOperation({ summary: '删除用户' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: '删除用户成功',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
