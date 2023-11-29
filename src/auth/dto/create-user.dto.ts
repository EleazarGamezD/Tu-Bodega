import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'user Email (unique) ',
    nullable: false,
    minLength: 1,
    example: 'cI8Bh@example.com',
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({
    description:
      'User Password,The password must have a Uppercase, lowercase letter and a number ',
    nullable: false,
    minLength: 6,
    maxLength: 50,
    example: '123456$$#%%aAAa',
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    description: 'user fullName ',
    nullable: false,
    minLength: 1,
    example: 'John Doe',
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'userName ',
    nullable: false,
    minLength: 1,
    example: 'johndoe',
  })
  @IsString()
  @IsOptional()
  userName: string;

  // @ApiProperty({
  //   description: 'list of details of the user (address, cellphone or phone)',
  //   nullable: true,
  //   minLength: 1,

  // })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  userDetails?: string[];

  @ApiProperty({
    description: 'user address ',
    nullable: true,
    minLength: 0,
    example: 'Calle 123',
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'user city ',
    nullable: true,
    minLength: 0,
    example: 'New York',
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'user phone ',
    nullable: true,
    minLength: 0,
    example: '1234567890',
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'user country ',
    nullable: true,
    minLength: 0,
    example: 'USA',
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({
    description: 'User Roles [admin, user, super-user] ',
    nullable: false,
    minLength: 1,
    example: 'user',
  })
  @IsString()
  @IsArray()
  @IsOptional()
  roles: string[];
}
