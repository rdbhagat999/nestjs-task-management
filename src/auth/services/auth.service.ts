import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository,
  ) {}
}