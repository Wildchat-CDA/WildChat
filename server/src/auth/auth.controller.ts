import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpException,
  UsePipes,
  ValidationPipe,
  BadRequestException,
  HttpStatus,
  UseGuards,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { InviteStudentDto } from './dto/invite-student.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) =>
          Object.values(error.constraints).join(', '),
        );
        return new BadRequestException(messages.join('. '));
      },
    }),
  )
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);

      if (result.user) {
        return { message: result.message, userId: result.user.id };
      } else {
        return { message: result.message };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status || 400);
    }
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const result = await this.authService.login(loginDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }

@Post('invite')
@UseGuards(RolesGuard, JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
async inviteStudents(@Body() inviteStudentDto: InviteStudentDto[]) {
  try {
    const result = await this.authService.inviteStudents(inviteStudentDto);
    return {
      message: result.message,
      invitations: result.invitations,
    };
  } catch (error) {
    throw new HttpException(
      error.message,
      error.status || HttpStatus.BAD_REQUEST,
    );
  }
}

@Put('invite/:token')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
async setPassword(@Param('token') token: string, @Body() setPasswordDto: SetPasswordDto) {
  try {
    const result = await this.authService.setPassword(token, setPasswordDto.password);
    return {
      message: result.message,
    };
  } catch (error) {
    throw new HttpException(
      error.message,
      error.status || HttpStatus.BAD_REQUEST,
    );
  }
}
}
