import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../models/user.entity';

// export const GetUser = (...args: string[]) => SetMetadata('get-user', args);

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const { user } = ctx.switchToHttp().getRequest();
    return user;
  },
);
