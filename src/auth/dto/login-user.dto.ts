import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'user Email (unique) ',
    nullable: false,
    minLength: 1,
    example: 'test@g.com',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'userName ',
    nullable: false,
    minLength: 1,
    example: 'test1',
  })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({
    description:
      'User Password,The password must have a Uppercase, lowercase letter and a number ',
    nullable: false,
    minLength: 6,
    maxLength: 50,
    example: 'Abc123',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
