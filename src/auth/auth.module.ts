import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { JwtStrategy } from './models/jwt-strategy';
import { UserRepository } from './repository/user.repository';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '1h',
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  exports: [TypeOrmModule, PassportModule, JwtStrategy],
})
export class AuthModule {}
