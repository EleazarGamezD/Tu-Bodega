
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

  @ApiProperty({
    description: 'User Roles [admin, user, super-user] ',
    nullable: false,
    minLength: 1,
    example: 'user, super-user',
  })
  @IsString()
  @IsOptional()
  roles?: string;


  @ApiProperty({
    description: 'User is active or not ',
    nullable: false,
    minLength: 1,
    default: true,
    example: 'true',
  })
  @IsOptional()
  isActive?: boolean;

}

export class UpdateUserDetailsDto {
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



}