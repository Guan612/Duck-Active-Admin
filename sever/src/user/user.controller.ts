import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { HashPasswordPipe } from './pipe/hash-password.pipe';
import { CheckUserExistsPipe } from './pipe/check-user-exists.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  create(
    @Body(CheckUserExistsPipe, HashPasswordPipe) createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  login(@Body() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
