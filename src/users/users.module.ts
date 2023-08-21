import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserDetailRepository, UserRepository } from 'src/repositories/user-repository';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, UserRepository, UserDetailRepository],
  imports: [ConfigModule, PassportModule, AuthModule],
})
export class UsersModule {}
