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
import { CreateUserDto, LoginUserDto, Role } from './dto/user.dto';
import { HashPasswordPipe } from './pipe/hash-password.pipe';
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
          loginId: 'snmqwq',
          nickname: '尚凝梦',
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
  async adminLogin(@Body() loginDto: LoginUserDto) {
    const res = await this.userService.findByLoginId(loginDto.loginId);
    if (res) {
      if (res.role != 0) {
        return this.authService.login(loginDto);
      } else {
        throw new HttpException('该用户不是管理员', 401);
      }
    } else {
      throw new HttpException('用户不存在', 404);
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.Teacher, Role.Admin)
  @ApiOperation({ summary: '获取用户列表' })
  @ApiBearerAuth()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个用户信息' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
