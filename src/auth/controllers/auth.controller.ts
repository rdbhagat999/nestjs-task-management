import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { AuthService } from '../services/auth.service';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../models/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<void> {
    return await this.authService.register(authCredentialsDto);
  }

  @Post('login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{
    accessToken: string;
  }> {
    return await this.authService.login(authCredentialsDto);
  }

  @Post('test')
  @UseGuards(AuthGuard())
  async test(@GetUser() { username }: User) {
    return { username };
  }
}
