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
  })
  @IsString()
  @MinLength(1)
  @IsOptional()
  fullName: string;

  @ApiProperty({
    description: 'userName ',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({
    description: 'list of details of the user (address, cellphone or phone)',
    nullable: true,
    minLength: 1,
  })
  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  userDetails: string[];

  @ApiProperty({
    description: 'user address ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  address: string;

  @ApiProperty({
    description: 'user city ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    description: 'user phone ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty({
    description: 'user country ',
    nullable: true,
    minLength: 0,
  })
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty({
    description: 'User Roles [admin, user, super-user] ',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsArray()
  @IsOptional()
  roles: string[];
}
