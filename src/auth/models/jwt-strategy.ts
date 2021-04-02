import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from '../repository/user.repository';
import { IJwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import * as CONFIG from 'config';

const { secret } = CONFIG.get('jwt');
const { JWT_SECRET } = process.env;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET || secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<User> {
    const { id, username } = payload;
    const user = await this.userRepository.findOne({ id, username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
