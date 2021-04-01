import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dtos/auth-credentials-dto';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { email, password } = authCredentialsDto;

      const username = email.split('@')[0];
      const salt = bcrypt.genSaltSync(15);
      const hashed = bcrypt.hashSync(password, salt);

      await this.save({ username, email, password: hashed, salt });
    } catch ({ message, code }) {
      if (code === '23505') {
        throw new ConflictException('Email already exists!');
      }
      throw new InternalServerErrorException(message);
    }
  }

  async login(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    const hashed = bcrypt.hashSync(password, user.salt);

    if (hashed !== user.password) {
      throw new UnauthorizedException('Wrong username or password');
    }
    return user;
  }
}
