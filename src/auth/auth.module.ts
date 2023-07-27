import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserDetails } from './entities/user-details.entity';
import { UserDetailRepository, UserRepository } from '../repositories/user-repository';


@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,UserRepository,UserDetailRepository],
  imports: [ConfigModule,
    TypeOrmModule.forFeature([User,UserDetails]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService )=>{
        return{
        secret: configService.get('JWT_SECRET'),
        signOptions:{ expiresIn:'2h'}
              }
        }
    })
  ],
 
  exports: [TypeOrmModule,JwtStrategy, PassportModule,JwtModule ]
  })
export class AuthModule {}
