import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: UserRepository,
  ) {}
}
