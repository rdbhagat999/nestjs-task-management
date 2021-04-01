import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { IJwtPayload } from '../models/jwt-payload.interface';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository,
    protected readonly jwtService: JwtService,
  ) {}

  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.userRepository.register(authCredentialsDto);
  }

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { id, username } = await this.userRepository.login(
      authCredentialsDto,
    );
    const payload: IJwtPayload = {
      id,
      username,
    };

    const accessToken = this.jwtService.sign(payload);
    this.logger.debug(`Generated token for USER ${username}`);
    return { accessToken };
  }
}
